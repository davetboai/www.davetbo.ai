#!/usr/bin/env python3
"""Backend CDK app — deploys Cognito auth for non-prod environments."""
import os
import aws_cdk as cdk
from stacks.auth_stack import AuthStack

app = cdk.App()

env = cdk.Environment(
    account=os.environ.get("CDK_DEFAULT_ACCOUNT"),
    region=os.environ.get("CDK_DEFAULT_REGION"),
)

stage = app.node.try_get_context("stage") or "dev"
auth_enabled = stage != "prod"

if auth_enabled:
    AuthStack(
        app,
        f"DavetboAi-Auth-{stage.upper()}",
        env=env,
    )

app.synth()
