#!/usr/bin/env bash
# Builds es-api.zip: the compiled Function plus production dependencies only, ready to upload and deploy
# (see "Deploy" in README.md). Run from anywhere: bash azure-api/scripts/package.sh
set -euo pipefail
cd "$(dirname "$0")/.."

npm ci
npm run build

rm -rf .package es-api.zip
mkdir .package
cp -r dist host.json package.json package-lock.json .package/
(cd .package && npm ci --omit=dev --ignore-scripts && zip -qr ../es-api.zip .)
rm -rf .package

echo "Built $(pwd)/es-api.zip ($(du -h es-api.zip | cut -f1))"
