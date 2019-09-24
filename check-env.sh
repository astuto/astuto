#!/bin/bash

# Exit immediately if a command exits with a non-zero status.
set -e

# Check if .env file is present
if [ ! -f .env ]; then
	echo "A .env file must be present. Please create a .env file in the root directory."
	exit 1
fi

# Array of environment variables that must be present
env_vars=(
	"ENVIRONMENT" \
	"POSTGRES_USER" \
	"POSTGRES_PASSWORD" \
	"EMAIL_CONFIRMATION" \
	"APP_NAME" \
	"SHOW_LOGO" \
	"POSTS_PER_PAGE" \
)

# Check each one
n_of_errors=0
for each in "${env_vars[@]}"; do
	if ! [[ -v $each ]]; then
		echo "$each is not set in .env file"
		n_of_errors=$((n_of_errors+1))
	fi
done

if [ $n_of_errors -gt 0 ]; then
	echo "You need to set these ${n_of_errors} variables in your .env file."
	echo "See .env-example for a configuration example."
	exit 2
fi