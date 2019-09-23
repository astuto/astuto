#!/bin/bash

# This file serves 3 use cases:
# 1: if the env variable UPDATE is 1, db is prepared and assets compiled by webpack
# 2: if a command was supplied, it is executed
# 3: otherwise, check env variable ENVIRONMENT and launch server

# Exit immediately if a command exits with a non-zero status.
set -e

# Check environment variables
/bin/bash ./check-env.sh

# Remove a potentially pre-existing server.pid for Rails.
rm -f /app/tmp/pids/server.pid

# Use case 1
if [ "$UPDATE" = 1 ]; then
  # Create database, load schema, run migrations and seed data in an idempotent way.
  echo "Preparing database..."
  rake db:prepare
  echo "Database prepared."

  # Use webpack to build JS and CSS.
  echo "Compiling JS and CSS with webpack..."
  ./bin/webpack
  echo "Webpack compilation completed."

  exit 0
fi

# Use case 2
if [ ! $# -eq 0 ]; then
  exec "$@"
  exit 0
fi

# Use case 3
echo "Environment is: $ENVIRONMENT"
if [ $ENVIRONMENT == "development" ]; then
  # Launch Rails server and webpack-dev-server using Foreman
  foreman start -p 3000
else # production
  # Compile assets with Webpack and then launch Rails server
  ./bin/webpack
  rails server -e production
fi