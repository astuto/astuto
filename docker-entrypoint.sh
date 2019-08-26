#!/bin/bash

# Exit immediately if a command exits with a non-zero status.
set -e

if [ "$UPDATE" = 1 ]; then
  echo "UPDATE (yarn packages, db preparation and webpack compilation)"

  # Launch yarn install
  echo "Launching yarn install..."
  yarn install
  echo "yarn install successfully executed."

  # Create database, load schema, run migrations and seed data in an idempotent way.
  echo "Preparing database..."
  rake db:prepare
  echo "Database prepared."

  # Use webpack to build JS and CSS.
  echo "Compiling JS and CSS with webpack..."
  ./bin/webpack
  echo "Webpack compilation completed."
fi

# Remove a potentially pre-existing server.pid for Rails.
rm -f /app/tmp/pids/server.pid

# Then exec the container's main process (what's set as CMD in the Dockerfile).
exec "$@"