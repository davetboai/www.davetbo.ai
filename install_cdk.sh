#!/bin/bash
# Installer for www.davetbo.ai
# Frontend Next.js app is built via Docker bundling during deploy.
#
# Usage: ./install_cdk.sh [-y] [-h] [-n] [-i] [-f] [-a]
#   -y  Auto-approve CDK deploys (--require-approval never)
#   -h  Use hotswap-fallback for faster deploys
#   -n  Disable CloudFormation rollback on failure
#   -i  Backend infrastructure (Cognito auth — non-prod only)
#   -f  Frontend deploy (builds Next.js via Docker, deploys to S3+CloudFront)
#   -a  All of the above (-if)
set -euo pipefail

START_TIME=$(date +%s)
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"

# --- Flag parsing ---
Y_FLAG=""
H_FLAG=""
N_FLAG=""
DO_INFRA=false
DO_FRONTEND=false

while getopts "yhnifa" opt; do
    case $opt in
        y) Y_FLAG="--require-approval never" ;;
        h) H_FLAG="--hotswap-fallback" ;;
        n) N_FLAG="--no-rollback" ;;
        i) DO_INFRA=true ;;
        f) DO_FRONTEND=true ;;
        a) DO_INFRA=true; DO_FRONTEND=true ;;
        *) echo "Unknown flag: -$OPTARG"; exit 1 ;;
    esac
done

if ! $DO_INFRA && ! $DO_FRONTEND; then
    echo "No action selected. Use -i, -f, or -a."
    echo "Run '$0 -a' to do everything."
    exit 1
fi

# --- Environment setup ---
echo "=== davetbo.ai Installer ==="
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
else
    pip install -r requirements.txt
fi
echo ""

# ========================================
# -i : Backend infrastructure (Cognito auth)
# ========================================
if $DO_INFRA; then
    echo "=== Phase 1: Backend Infrastructure Deploy ==="

    cd "$SCRIPT_DIR/infra/backend"
    BACKEND_CDK_OPTS="--all --outputs-file $SCRIPT_DIR/infra/frontend/backend_outputs.json $N_FLAG $Y_FLAG $H_FLAG"
    # shellcheck disable=SC2086
    cdk deploy $BACKEND_CDK_OPTS
    if [ $? -ne 0 ]; then
        echo "ERROR: Backend CDK deploy failed."
        exit 1
    fi

    echo "Backend infrastructure deploy complete."
    echo ""
fi

# ========================================
# -f : Frontend deploy
# ========================================
if $DO_FRONTEND; then
    echo "=== Phase 2: Frontend Deploy ==="

    # Install frontend CDK deps (shared venv from backend)
    if command -v uv &>/dev/null; then
        uv pip install -r "$SCRIPT_DIR/infra/frontend/requirements.txt"
    else
        pip install -r "$SCRIPT_DIR/infra/frontend/requirements.txt"
    fi

    cd "$SCRIPT_DIR/infra/frontend"
    export BUILD_UID=$UID
    # NOTE: Do NOT pass $H_FLAG here — hotswap skips the CloudFront invalidation
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
fi

# --- Done ---
END_TIME=$(date +%s)
ELAPSED=$((END_TIME - START_TIME))
echo "=== Done! (${ELAPSED}s) ==="
