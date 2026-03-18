#!/usr/bin/env python3
"""Frontend CDK app — deploys the static site with optional Cognito auth."""
import aws_cdk as cdk
import os
from lib.site_stack import SiteStack

app = cdk.App()

env = cdk.Environment(
    account=os.environ.get("CDK_DEFAULT_ACCOUNT"),
    region=os.environ.get("CDK_DEFAULT_REGION"),
)

stage = app.node.try_get_context("stage") or "dev"
auth_enabled = stage != "prod"

# Auth config — read from context (uses an existing Cognito user pool)
user_pool_id = app.node.try_get_context("user_pool_id") or ""
user_pool_client_id = app.node.try_get_context("user_pool_client_id") or ""

if auth_enabled and (not user_pool_id or not user_pool_client_id):
    import sys
    print(
        "ERROR: Auth is enabled (stage != 'prod') but user_pool_id or "
        "user_pool_client_id is missing from cdk.json context.\n"
        "Add them to infra/frontend/cdk.json or pass via -c flags.",
        file=sys.stderr,
    )
    sys.exit(1)

# Domain config
# NOTE: The apex domain (davetbo.ai) DNS records are managed manually outside
# this stack. Do not create Route53 records for the apex here — they will
# conflict with the existing manually-created records. The apex is listed in
# extra_cloudfront_domains so CloudFront accepts traffic for it.
domain_name = app.node.try_get_context("domain_name") or ""
extra_cf = app.node.try_get_context("extra_cloudfront_domains") or ""
extra_cloudfront_domains = [d.strip() for d in extra_cf.split(",") if d.strip()] if extra_cf else []
hosted_zone_id = app.node.try_get_context("hosted_zone_id") or ""
hosted_zone_name = app.node.try_get_context("hosted_zone_name") or ""
certificate_arn = app.node.try_get_context("certificate_arn") or ""

domain_names = []
if domain_name:
    domain_names.append(domain_name)

SiteStack(
    app,
    f"DavetboAi-Site-{stage.upper()}",
    env=env,
    termination_protection=True,
    auth_enabled=auth_enabled,
    user_pool_id=user_pool_id,
    user_pool_client_id=user_pool_client_id,
    domain_names=domain_names,
    extra_cloudfront_domains=extra_cloudfront_domains,
    hosted_zone_id=hosted_zone_id,
    hosted_zone_name=hosted_zone_name,
    certificate_arn=certificate_arn,
)

app.synth()
