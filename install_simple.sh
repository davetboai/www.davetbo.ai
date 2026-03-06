#!/bin/bash
# Simple deploy script for www.davetbo.ai
# Uses CloudFormation + AWS CLI — no CDK, Docker, or Python required.
#
# Usage: ./install_simple.sh [-c] [-d] [-D]
#   (no flags)  Build frontend and deploy to existing stack
#   -c          Create/update the CloudFormation stack first
#   -d          Custom domain mode (prompts for domain + cert ARN)
#   -D          Tear down: empty bucket and delete stack
set -euo pipefail

START_TIME=$(date +%s)
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
STACK_NAME="davetbo-ai-site"

# --- Flag parsing ---
DO_STACK=false
CUSTOM_DOMAIN=false
TEAR_DOWN=false

while getopts "cdD" opt; do
    case $opt in
        c) DO_STACK=true ;;
        d) CUSTOM_DOMAIN=true; DO_STACK=true ;;
        D) TEAR_DOWN=true ;;
        *) echo "Unknown flag: -$OPTARG"; exit 1 ;;
    esac
done

# --- Helpers ---
get_stack_output() {
    aws cloudformation describe-stacks \
        --stack-name "$STACK_NAME" \
        --query "Stacks[0].Outputs[?OutputKey=='$1'].OutputValue" \
        --output text 2>/dev/null
}

# --- Preflight checks ---
if ! command -v aws &>/dev/null; then
    echo "ERROR: AWS CLI not found. Install it from:"
    echo "  https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html"
    exit 1
fi

if ! aws sts get-caller-identity &>/dev/null; then
    echo "ERROR: AWS credentials not configured. Run 'aws configure' first."
    exit 1
fi

# ========================================
# -D : Tear down
# ========================================
if $TEAR_DOWN; then
    echo "=== Tearing down stack: $STACK_NAME ==="
    BUCKET=$(get_stack_output "BucketName")
    if [ -n "$BUCKET" ]; then
        echo "Emptying bucket: $BUCKET"
        aws s3 rm "s3://$BUCKET" --recursive
    fi
    echo "Deleting stack..."
    aws cloudformation delete-stack --stack-name "$STACK_NAME"
    aws cloudformation wait stack-delete-complete --stack-name "$STACK_NAME"
    echo "Stack deleted."
    exit 0
fi

# ========================================
# -c : Create/update CloudFormation stack
# ========================================
if $DO_STACK; then
    echo "=== Deploying CloudFormation stack: $STACK_NAME ==="

    PARAM_OVERRIDES=""
    if $CUSTOM_DOMAIN; then
        read -rp "Custom domain (e.g. www.example.com): " DOMAIN
        read -rp "ACM certificate ARN (us-east-1): " CERT_ARN
        PARAM_OVERRIDES="--parameter-overrides DomainName=$DOMAIN CertificateArn=$CERT_ARN"
    fi

    # shellcheck disable=SC2086
    aws cloudformation deploy \
        --template-file "$SCRIPT_DIR/cloudformation.yaml" \
        --stack-name "$STACK_NAME" \
        --capabilities CAPABILITY_IAM \
        $PARAM_OVERRIDES

    echo ""
    echo "Stack outputs:"
    aws cloudformation describe-stacks \
        --stack-name "$STACK_NAME" \
        --query "Stacks[0].Outputs" \
        --output table
    echo ""
fi

# ========================================
# Build and deploy frontend
# ========================================
BUCKET=$(get_stack_output "BucketName")
DIST_ID=$(get_stack_output "DistributionId")

if [ -z "$BUCKET" ] || [ -z "$DIST_ID" ]; then
    echo "ERROR: Could not read stack outputs. Run with -c first to create the stack."
    exit 1
fi

echo "=== Building frontend ==="
cd "$SCRIPT_DIR/frontend"

if ! command -v yarn &>/dev/null; then
    echo "Enabling corepack for yarn..."
    corepack enable
fi

yarn install --immutable 2>/dev/null || yarn install
yarn build

echo ""
echo "=== Deploying to S3 ==="
aws s3 sync out/ "s3://$BUCKET" --delete

echo ""
echo "=== Invalidating CloudFront cache ==="
INVALIDATION_ID=$(aws cloudfront create-invalidation \
    --distribution-id "$DIST_ID" \
    --paths "/*" \
    --query "Invalidation.Id" \
    --output text)
echo "Invalidation created: $INVALIDATION_ID"

# --- Done ---
SITE_URL=$(get_stack_output "SiteUrl")
END_TIME=$(date +%s)
ELAPSED=$((END_TIME - START_TIME))
echo ""
echo "=== Done! (${ELAPSED}s) ==="
echo "Site: $SITE_URL"
