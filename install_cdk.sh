#!/bin/bash
# CDK installer for www.davetbo.ai
# Frontend Next.js app is built via Docker bundling during deploy.
# Auth uses an existing Cognito user pool (configured in cdk.json context).
#
# Usage: ./install_cdk.sh [-y] [-n]
#   -y  Auto-approve CDK deploys (--require-approval never)
#   -n  Disable CloudFormation rollback on failure
set -euo pipefail

START_TIME=$(date +%s)
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"

# --- Flag parsing ---
Y_FLAG=""
N_FLAG=""

while getopts "yn" opt; do
    case $opt in
        y) Y_FLAG="--require-approval never" ;;
        n) N_FLAG="--no-rollback" ;;
        *) echo "Unknown flag: -$OPTARG"; exit 1 ;;
    esac
done

# --- Environment setup ---
echo "=== davetbo.ai CDK Installer ==="
echo ""

# Source bash_profile for nvm/pyenv/etc if present
if [ -f "$HOME/.bash_profile" ]; then
    source "$HOME/.bash_profile" 2>/dev/null || true
fi

# --- Python venv + CDK dependencies ---
echo "Setting up Python environment..."
cd "$SCRIPT_DIR/infra/backend"
if [ ! -d ".venv" ]; then
    python3 -m venv .venv
fi
source .venv/bin/activate

if command -v uv &>/dev/null; then
    uv pip install -r requirements.txt
    uv pip install -r "$SCRIPT_DIR/infra/frontend/requirements.txt"
else
    pip install -r requirements.txt
    pip install -r "$SCRIPT_DIR/infra/frontend/requirements.txt"
fi
echo ""

# ========================================
# Deploy frontend (S3 + CloudFront)
# ========================================
echo "=== Deploying Frontend ==="

cd "$SCRIPT_DIR/infra/frontend"
export BUILD_UID=$UID
# NOTE: Do NOT pass hotswap flags — hotswap skips the CloudFront invalidation
# that BucketDeployment triggers via its custom resource Lambda.
FRONTEND_CDK_OPTS="--all $N_FLAG $Y_FLAG"
# shellcheck disable=SC2086
cdk deploy $FRONTEND_CDK_OPTS
if [ $? -ne 0 ]; then
    echo "ERROR: Frontend CDK deploy failed."
    exit 1
fi
echo "Frontend deploy complete."
echo ""

# --- Done ---
END_TIME=$(date +%s)
ELAPSED=$((END_TIME - START_TIME))
echo "=== Done! (${ELAPSED}s) ==="
