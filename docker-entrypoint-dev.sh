#!/bin/sh

set -e

sh docker-entrypoint.sh

# Needed to run .bin/dev
yarn install --check-files

# Generate Swagger documentation (don't know why it's not passed from container to host)
echo "Generating Swagger documentation..."
bundle exec rake rswag:specs:swaggerize
echo "Swagger documentation generated."

# Launch Rails server + yarn build:css + yarn build
./bin/dev