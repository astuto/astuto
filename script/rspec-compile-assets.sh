#!/bin/sh

# This is needed if some changes have been made to JavaScript files
# Otherwise system specs are not going to get updates made to JS files

RAILS_ENV="test" bundle exec rake assets:precompile