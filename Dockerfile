###
### Build stage ###
###
FROM ruby:2.6.6 AS builder

RUN curl -sL https://deb.nodesource.com/setup_14.x | bash -
RUN apt-get update -qq && apt-get install -y nodejs postgresql-client
RUN npm install -g yarn

ENV APP_ROOT /astuto
WORKDIR ${APP_ROOT}

###
### Development stage ###
###
FROM builder AS dev

# Launch processes in Procfile
RUN gem install foreman

# Copy Gemfile and install gems
COPY Gemfile Gemfile.lock ${APP_ROOT}/
RUN bundle install

# Copy package.json and install packages
COPY package.json yarn.lock ${APP_ROOT}/
RUN yarn install --check-files

ENTRYPOINT ["./docker-entrypoint.sh"]

EXPOSE 3000

###
### Prod build stage ###
###
FROM builder AS prod-builder

RUN export RAILS_ENV=production
RUN export NODE_ENV=production

# Copy Gemfile and install gems
COPY Gemfile Gemfile.lock ${APP_ROOT}/
RUN bundle install --deployment

# Copy package.json and install packages
COPY package.json yarn.lock ${APP_ROOT}/
RUN yarn install --check-files --production

# Copy all files
COPY . ${APP_ROOT}/

# Compile assets
# RUN rm -rf ${APP_ROOT}/public/packs/
# RUN bundle exec rake webpacker:compile

###
### Production stage ###
###
FROM ruby:2.6.6-slim AS prod

RUN apt-get update -qq && \
  apt-get install -yq  \
  postgresql-client=11+200+deb10u4 \
  nodejs && \
  apt-get clean && \
  rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/* && \
  truncate -s 0 /var/log/*log

ENV APP_ROOT /astuto
WORKDIR ${APP_ROOT}

# Copy gems, packages and compiled assets
COPY --from=prod-builder ${APP_ROOT}/vendor/bundle/ ${APP_ROOT}/vendor/bundle/
COPY --from=prod-builder ${APP_ROOT}/node_modules/ ${APP_ROOT}/node_modules/
COPY --from=prod-builder ${APP_ROOT}/public/ ${APP_ROOT}/public/

# Copy application code
COPY --from=prod-builder ${APP_ROOT}/app/ ${APP_ROOT}/app/
COPY --from=prod-builder ${APP_ROOT}/bin/ ${APP_ROOT}/bin/
COPY --from=prod-builder ${APP_ROOT}/config/ ${APP_ROOT}/config/
COPY --from=prod-builder ${APP_ROOT}/db/ ${APP_ROOT}/db/

# Copy scripts and configuration files
COPY --from=prod-builder ${APP_ROOT}/docker-entrypoint.sh ${APP_ROOT}/
COPY --from=prod-builder ${APP_ROOT}/Gemfile ${APP_ROOT}/
COPY --from=prod-builder ${APP_ROOT}/Gemfile.lock ${APP_ROOT}/
COPY --from=prod-builder ${APP_ROOT}/.ruby-version ${APP_ROOT}/
COPY --from=prod-builder ${APP_ROOT}/config.ru ${APP_ROOT}/
COPY --from=prod-builder ${APP_ROOT}/Rakefile ${APP_ROOT}/

ENTRYPOINT ["./docker-entrypoint.sh"]

EXPOSE 3000