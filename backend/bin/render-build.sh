#!/usr/bin/env bash
# exit on error
set -o errexit

cd backend
bundle install
bundle exec rake db:migrate
bundle exec rails db:seed