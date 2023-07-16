#!/usr/bin/env bash
# exit on error
set -o errexit

cd backend
bundle install
DISABLE_DATABASE_ENVIRONMENT_CHECK=1 bundle exec rake db:reset
bundle exec rails db:seed
# bundle exec rake db:migrate