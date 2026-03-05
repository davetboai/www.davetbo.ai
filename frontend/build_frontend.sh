#!/bin/sh
echo "Starting build_frontend.sh" && \
echo "running apt update && install" && \
apt update && apt install node-corepack -y && \
echo "running corepack enable && install" && \
corepack enable && corepack install --all -g && \
# Copy source to a temp build dir so yarn install doesn't write
# root-owned node_modules into the bind-mounted host directory
echo "Copying source to /tmp/build" && \
cp -r /asset-input /tmp/build && \
cd /tmp/build && \
echo "removing previous build output" && \
if [ -d out ]; then rm -Rf out; fi && \
if [ -d .next ]; then rm -Rf .next; fi && \
echo "running yarn to install deps" && \
yarn && \
echo 'Running build' && \
yarn build && \
echo 'Copying out/* to /asset-output' && \
mv out/* /asset-output && \
echo "Cleaning up root-owned files on bind-mounted host dir" && \
rm -rf /asset-input/node_modules /asset-input/.next && \
if [ -d /asset-input/out ]; then \
  if [ -n "${BUILD_UID:-}" ]; then chown -R "$BUILD_UID:$BUILD_UID" /asset-input/out; \
  else chown -R 1000:1000 /asset-input/out; fi; \
fi && \
echo "Build complete."
