FROM ruby:2.6.6

RUN curl -sL https://deb.nodesource.com/setup_14.x | bash -
RUN apt-get update -qq && apt-get install -y nodejs postgresql-client
RUN npm install -g yarn

ENV APP_ROOT /astuto
RUN mkdir ${APP_ROOT}
WORKDIR ${APP_ROOT}

# Launch processes in Procfile
RUN gem install foreman

# Copy Gemfile and install gems
COPY Gemfile Gemfile.lock ${APP_ROOT}/
RUN bundle install

# Copy package.json and install packages
COPY package.json yarn.lock ${APP_ROOT}/
RUN yarn install --check-files

# Copy all files
COPY . ${APP_ROOT}/

# Compile assets
# RUN export NODE_ENV=production
# RUN rake webpacker:compile

# Add a script to be executed every time the container starts
ENTRYPOINT ["./docker-entrypoint.sh"]

EXPOSE 3000