#!/usr/bin/env python3
"""Frontend CDK app — reads backend auth outputs (if any) and deploys site."""
import json
import os
import aws_cdk as cdk
from lib.site_stack import SiteStack

app = cdk.App()

env = cdk.Environment(
    account=os.environ.get("CDK_DEFAULT_ACCOUNT"),
    region=os.environ.get("CDK_DEFAULT_REGION"),
)

stage = app.node.try_get_context("stage") or "dev"
auth_enabled = stage != "prod"

# Read auth outputs if auth is enabled
user_pool_id = ""
user_pool_client_id = ""
identity_pool_id = ""

if auth_enabled:
    outputs_file = os.path.join(os.path.dirname(__file__), "backend_outputs.json")
    if os.path.isfile(outputs_file):
        with open(outputs_file) as f:
            all_outputs = json.load(f)
        for stack_name, outputs in all_outputs.items():
            if "UserPoolId" in outputs:
                user_pool_id = outputs["UserPoolId"]
                user_pool_client_id = outputs["UserPoolClientId"]
                identity_pool_id = outputs["IdentityPoolId"]
                break
        if not user_pool_id:
            import sys
            print(
                "ERROR: Auth is enabled but could not find auth stack outputs "
                "in backend_outputs.json.\n"
                "Deploy the backend first: ./install_cdk.sh -i",
                file=sys.stderr,
            )
            sys.exit(1)
    else:
        import sys
        print(
            f"ERROR: Auth is enabled but {outputs_file} not found.\n"
            "Deploy the backend first: ./install_cdk.sh -i",
            file=sys.stderr,
        )
        sys.exit(1)

# Read frontend-specific context from cdk.json
domain_name = app.node.try_get_context("domain_name") or ""
apex_domain = app.node.try_get_context("apex_domain") or ""
hosted_zone_id = app.node.try_get_context("hosted_zone_id") or ""
hosted_zone_name = app.node.try_get_context("hosted_zone_name") or ""
certificate_arn = app.node.try_get_context("certificate_arn") or ""

# Build list of domain names (primary first, then apex if specified)
domain_names = []
if domain_name:
    domain_names.append(domain_name)
if apex_domain:
    domain_names.append(apex_domain)

SiteStack(
    app,
    f"DavetboAi-Site-{stage.upper()}",
    env=env,
    auth_enabled=auth_enabled,
    user_pool_id=user_pool_id,
    user_pool_client_id=user_pool_client_id,
    identity_pool_id=identity_pool_id,
    domain_names=domain_names,
    hosted_zone_id=hosted_zone_id,
    hosted_zone_name=hosted_zone_name,
    certificate_arn=certificate_arn,
)

app.synth()
