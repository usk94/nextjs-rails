#!/usr/bin/env bash
# exit on error
set -o errexit

cd backend

if git diff --name-only HEAD HEAD~1 | grep -q "Gemfile.lock"
then
  echo "Gemfile.lock has changed. Running bundle install..."
  bundle install
else
  echo "Gemfile.lock has not changed."
fi

if git diff --name-only HEAD HEAD~1 | grep -q "db/migrate"
then
  echo "Migration files have changed. Running bundle exec rake db:migrate..."
  bundle exec rake db:migrate
else
  echo "No new migration files."
fi
