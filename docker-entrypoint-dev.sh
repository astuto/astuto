#!/bin/sh

set -e

sh docker-entrypoint.sh

# Needed to avoid "webpack-dev-server not found" error
yarn install --check-files

# Launch Rails server and webpack-dev-server using Foreman
foreman start -p 3000