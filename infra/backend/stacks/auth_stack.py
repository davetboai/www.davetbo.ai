from aws_cdk import (
    RemovalPolicy,
    Stack,
    aws_cognito as cognito,
    aws_iam as iam,
    CfnOutput,
)
from constructs import Construct

INVITE_EMAIL_BODY = (
    '<div style="font-family: Inter, -apple-system, sans-serif; max-width: 560px; '
    'margin: 0 auto; padding: 40px 24px; color: #1a1a2e;">'
    '<div style="text-align: center; margin-bottom: 32px;">'
    '<h1 style="color: #002147; font-size: 28px; margin: 0;">davetbo.ai</h1>'
    '<p style="color: #666; font-size: 14px; margin-top: 4px;">Preview Access</p>'
    "</div>"
    '<p style="font-size: 16px; line-height: 1.6;">You have been invited to preview '
    "the <strong>davetbo.ai</strong> website.</p>"
    '<div style="background: #f8f7f4; border-radius: 12px; padding: 24px; margin: 24px 0; '
    'border-left: 4px solid #002147;">'
    '<p style="margin: 0 0 12px 0; font-size: 15px;"><strong>Your sign-in credentials:</strong></p>'
    '<p style="margin: 0 0 8px 0; font-size: 15px;">Username: '
    '<code style="background: #e8e6e1; padding: 2px 8px; border-radius: 4px;">{username}</code></p>'
    '<p style="margin: 0; font-size: 15px;">Temporary password: '
    '<code style="background: #e8e6e1; padding: 2px 8px; border-radius: 4px;">{####}</code></p>'
    "</div>"
    '<p style="font-size: 14px; line-height: 1.6; color: #555;">You will be asked to set a new '
    "password on your first sign-in. Your temporary password expires in 7 days.</p>"
    '<hr style="border: none; border-top: 1px solid #e0ddd8; margin: 32px 0;">'
    '<p style="font-size: 12px; color: #999; text-align: center;">davetbo.ai</p>'
    "</div>"
)


class AuthStack(Stack):
    def __init__(
        self,
        scope: Construct,
        construct_id: str,
        **kwargs,
    ) -> None:
        super().__init__(scope, construct_id, termination_protection=True, **kwargs)

        # Cognito User Pool
        self.user_pool = cognito.UserPool(
            self,
            "UserPool",
            removal_policy=RemovalPolicy.DESTROY,
            user_pool_name=f"{self.stack_name}-UserPool",
            self_sign_up_enabled=False,
            auto_verify={"email": True},
            sign_in_aliases={"email": True},
            password_policy={
                "require_digits": True,
                "require_lowercase": True,
                "require_symbols": True,
                "require_uppercase": True,
                "min_length": 8,
            },
            mfa=cognito.Mfa.OFF,
            user_invitation=cognito.UserInvitationConfig(
                email_subject="Preview access to davetbo.ai",
                email_body=INVITE_EMAIL_BODY,
                sms_message="Your username is {username} and temporary password is {####}",
            ),
        )

        # Cognito Domain (required for hosted UI / token endpoints)
        self.user_pool_domain = self.user_pool.add_domain(
            "UserPoolDomain",
            cognito_domain=cognito.CognitoDomainOptions(
                domain_prefix=f"{self.stack_name.lower().replace(' ', '-')}",
            ),
        )

        self.user_pool_client = cognito.UserPoolClient(
            self,
            "UserPoolClient",
            user_pool=self.user_pool,
            auth_flows=cognito.AuthFlow(
                user_password=True,
                user_srp=True,
            ),
        )

        # Identity Pool
        self.identity_pool = cognito.CfnIdentityPool(
            self,
            "IdentityPool",
            allow_unauthenticated_identities=False,
            cognito_identity_providers=[
                cognito.CfnIdentityPool.CognitoIdentityProviderProperty(
                    client_id=self.user_pool_client.user_pool_client_id,
                    provider_name=self.user_pool.user_pool_provider_name,
                )
            ],
        )

        # Authenticated IAM Role
        self.authenticated_role = iam.Role(
            self,
            "AuthenticatedRole",
            assumed_by=iam.FederatedPrincipal(
                "cognito-identity.amazonaws.com",
                {
                    "StringEquals": {
                        "cognito-identity.amazonaws.com:aud": self.identity_pool.ref,
                    },
                    "ForAnyValue:StringLike": {
                        "cognito-identity.amazonaws.com:amr": "authenticated",
                    },
                },
                "sts:AssumeRoleWithWebIdentity",
            ),
        )

        cognito.CfnIdentityPoolRoleAttachment(
            self,
            "IdentityPoolRoleAttachment",
            identity_pool_id=self.identity_pool.ref,
            roles={"authenticated": self.authenticated_role.role_arn},
        )

        # CloudFormation Outputs
        CfnOutput(self, "UserPoolId", value=self.user_pool.user_pool_id)
        CfnOutput(self, "UserPoolClientId", value=self.user_pool_client.user_pool_client_id)
        CfnOutput(self, "IdentityPoolId", value=self.identity_pool.ref)
        CfnOutput(self, "CognitoDomain", value=self.user_pool_domain.domain_name)
