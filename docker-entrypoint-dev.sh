#!/bin/sh

set -e

sh docker-entrypoint.sh

# Needed to run .bin/dev
yarn install --check-files

# Launch Rails server + yarn build:css + yarn build
./bin/dev