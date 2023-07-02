FROM ruby:3.2.0

ENV BUNDLE_VERSION 2.3.21
ENV APP /usr/src/app

# netcat is for nc command
RUN apt-get update
RUN apt-get install -y netcat
RUN apt-get install -y vim

RUN gem install bundler --version "$BUNDLE_VERSION"

RUN mkdir $APP
WORKDIR $APP

COPY Gemfile* $APP/

COPY . $APP/

RUN bundle exec rails db:seed
CMD ["./bin/server-dev"]