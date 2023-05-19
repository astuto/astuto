#!/bin/sh

set -e

sh docker-entrypoint.sh

# Launch Rails server + yarn build:css + yarn build:js
./bin/dev