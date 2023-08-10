#!/usr/bin/env bash
# exit on error
set -o errexit

cd backend
bundle install

bundle exec rake db:migrate
# bundle exec rake db:seed

# if [ "$(git rev-list --count HEAD)" -gt 1 ] && git diff --name-only HEAD HEAD~1 | grep -q "db/migrate"
# then
#   echo "Migration files have changed. Running bundle exec rake db:migrate..."
#   bundle exec rake db:migrate
# else
#   echo "No new migration files."
# fi
