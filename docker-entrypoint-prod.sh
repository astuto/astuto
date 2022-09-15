#!/bin/sh

set -e

sh docker-entrypoint.sh

# Launch Rails server in production
bundle exec rails server -e production