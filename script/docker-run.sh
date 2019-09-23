#!/bin/bash

# Exit immediately if a command exits with a non-zero status.
set -e

echo "Starting Astuto..."

docker-compose up "$@"