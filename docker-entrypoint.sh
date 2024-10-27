#!/bin/sh

# Exit immediately if a command exits with a non-zero status
set -e

# Remove a potentially pre-existing server.pid for Rails
rm -f $APP_ROOT/tmp/pids/server.pid

# Prepare database
echo "Preparing database..."

# Wait for database
until bundle exec rake db:version; do
  >&2 echo "Waiting for postgres to initialize..."
  sleep 1
done

# Update or create database
db_version=$(bundle exec rake db:version)
echo "$db_version"
if [ "$db_version" = "Current version: 0" ]; then
  bundle exec rake db:create
  bundle exec rake db:schema:load
  bundle exec rake db:migrate
  bundle exec rake db:seed
else
  bundle exec rake db:migrate
fi
echo "Database prepared."

# Generate Swagger documentation
echo "Generating Swagger documentation..."
bundle exec rake rswag:specs:swaggerize
echo "Swagger documentation generated."