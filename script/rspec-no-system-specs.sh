#!/bin/sh

# Run all specs except system specs (i.e. specs contained in the folder spec/system)

rspec --exclude-pattern "spec/system/**/*_spec.rb"