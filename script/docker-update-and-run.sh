#!/bin/bash

# Exit immediately if a command exits with a non-zero status.
set -e

/bin/bash script/docker-update.sh
/bin/bash script/docker-run.sh