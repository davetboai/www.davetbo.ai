"""SiteStack — builds and deploys the Next.js frontend via Docker bundling."""
import os
from typing import List
import aws_cdk as cdk
from aws_cdk import (
    Stack,
    CfnOutput,
    BundlingOptions,
    aws_s3_deployment as s3_deployment,
)
from constructs import Construct
from lib.static_site import StaticSitePrivateS3


class SiteStack(Stack):
    def __init__(
        self,
        scope: Construct,
        construct_id: str,
        auth_enabled: bool = False,
        user_pool_id: str = "",
        user_pool_client_id: str = "",
        domain_names: List[str] | None = None,
        extra_cloudfront_domains: List[str] | None = None,
        hosted_zone_id: str = "",
        hosted_zone_name: str = "",
        certificate_arn: str = "",
        **kwargs,
    ) -> None:
        super().__init__(scope, construct_id, **kwargs)

        domain_names = domain_names or []
        primary_domain = domain_names[0] if domain_names else ""

        # Create S3 + CloudFront static site
        self.site = StaticSitePrivateS3(
            self,
            "StaticSite",
            domain_names=domain_names,
            extra_cloudfront_domains=extra_cloudfront_domains,
            hosted_zone_id=hosted_zone_id,
            hosted_zone_name=hosted_zone_name,
            certificate_arn=certificate_arn,
        )

        # Resolve the path to the frontend source (two levels up from infra/frontend/)
        frontend_path = os.path.join(os.path.dirname(__file__), "..", "..", "..", "frontend")
        frontend_path = os.path.abspath(frontend_path)

        # Build and deploy frontend via Docker bundling
        frontend_asset = s3_deployment.Source.asset(
            frontend_path,
            bundling=BundlingOptions(
                user="0:0",
                environment={
                    "AUTH_ENABLED": "true" if auth_enabled else "false",
                    "USER_POOL_ID": user_pool_id,
                    "USER_POOL_CLIENT_ID": user_pool_client_id,
                    "CLOUDFRONT_DOMAIN": primary_domain,
                    "BUILD_UID": os.environ.get("BUILD_UID", "1000"),
                },
                image=cdk.DockerImage.from_registry("debian"),
                command=["/bin/sh", "-c", "/asset-input/build_frontend.sh"],
            ),
        )

        s3_deployment.BucketDeployment(
            self,
            "FrontendDeployment",
            sources=[frontend_asset],
            destination_bucket=self.site.bucket,
            distribution=self.site.distribution,
            distribution_paths=["/*"],
        )

        # Outputs
        CfnOutput(
            self,
            "CloudFrontDomain",
            value=self.site.distribution.distribution_domain_name,
            description="CloudFront distribution domain",
        )

        CfnOutput(
            self,
            "CloudFrontUrl",
            value=f"https://{self.site.distribution.distribution_domain_name}",
            description="CloudFront URL",
        )

        if primary_domain:
            CfnOutput(
                self,
                "SiteUrl",
                value=f"https://{primary_domain}",
                description="Site URL (custom domain)",
            )
