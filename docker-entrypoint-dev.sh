#!/bin/sh

set -e

sh docker-entrypoint.sh

# Launch Rails server + yarn build
./bin/dev