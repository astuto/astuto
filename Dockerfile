# -- BUILD STAGE --
FROM ruby:3.0.6-slim AS builder

ENV APP_ROOT=/astuto
WORKDIR $APP_ROOT

# Install system dependencies
RUN apt-get update && \
  apt-get install -y --no-install-recommends --fix-missing \
    build-essential \
    libpq-dev \
    postgresql-client \
    ca-certificates \
    curl \
    gnupg \
    git

# Node.js & Yarn install (Node 20)
RUN mkdir -p /etc/apt/keyrings && \
  curl -fsSL https://deb.nodesource.com/gpgkey/nodesource-repo.gpg.key | gpg --dearmor -o /etc/apt/keyrings/nodesource.gpg && \
  echo "deb [signed-by=/etc/apt/keyrings/nodesource.gpg] https://deb.nodesource.com/node_20.x nodistro main" | tee /etc/apt/sources.list.d/nodesource.list

RUN apt-get update && apt-get install -y --fix-missing --no-install-recommends nodejs
RUN npm install -g yarn

RUN gem install bundler -v 2.3

# Copy and install Ruby gems
COPY Gemfile Gemfile.lock ./
RUN bundle install

# Copy and install JS deps
COPY package.json yarn.lock ./
RUN yarn install --check-files

# Copy the remaining application files
COPY . . 

# Build Swagger API documentation (optional: can be done in stage prod)
RUN RSWAG_SWAGGERIZE=true RAILS_ENV=test bundle exec rake rswag:specs:swaggerize

# Precompile assets (prod only, facoltativo qui)
RUN SECRET_KEY_BASE=dummy RAILS_ENV=production bundle exec rails assets:precompile

# -- Dev stage --
FROM builder AS dev

ENTRYPOINT ["./docker-entrypoint-dev.sh"]

EXPOSE 3000

# -- INIT STAGE --
FROM ruby:3.0.6-slim AS init
RUN groupadd -r appgroup && useradd -r -g appgroup appuser

# Install system dependencies
RUN apt-get update && \
    apt-get install -y --no-install-recommends --fix-missing \
      build-essential \
      libpq-dev \
      postgresql-client \
    curl \
 && \
    rm -rf /var/lib/apt/lists/*

# Set environment variables
ENV APP_ROOT=/astuto
WORKDIR $APP_ROOT

# Copy Gemfiles and install gems
#COPY Gemfile Gemfile.lock ./
#RUN gem install bundler && bundle install
# Install bundler (optional: specify version if needed)
RUN gem install bundler

# Copy Gemfile and Gemfile.lock
COPY Gemfile Gemfile.lock ./

# Install gems
RUN bundle install
# Copy the rest of the application code
COPY . .

# Ensure the entrypoint script is executable
RUN chmod +x docker-entrypoint.sh

# Set rights
RUN chown -R appuser:appgroup $APP_ROOT

# Switch to non-root user
USER appuser

# Set entrypoint
ENTRYPOINT ["./docker-entrypoint.sh"]

ENV APP_ROOT=/astuto
WORKDIR $APP_ROOT

# -- PRODUCTION STAGE --
FROM ruby:3.0.6-slim AS prod

RUN groupadd -r appgroup && useradd -r -g appgroup appuser

ENV APP_ROOT=/astuto
WORKDIR $APP_ROOT

RUN apt-get update && \
  apt-get install -y --no-install-recommends --fix-missing  \
    postgresql-client \
    build-essential \
    libpq-dev \
    curl \
    gnupg && \
  rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

RUN mkdir -p /etc/apt/keyrings && \
  curl -fsSL https://deb.nodesource.com/gpgkey/nodesource-repo.gpg.key | gpg --dearmor -o /etc/apt/keyrings/nodesource.gpg && \
  echo "deb [signed-by=/etc/apt/keyrings/nodesource.gpg] https://deb.nodesource.com/node_20.x nodistro main" | tee /etc/apt/sources.list.d/nodesource.list && \
  apt-get update && apt-get install --fix-missing -y nodejs && \
  npm install -g yarn

RUN gem install bundler -v 2.3

# Copy only crucial files for bundle install
COPY Gemfile Gemfile.lock ./
RUN bundle install

# Copy all app sources (escludi node_modules, vendor/bundle se per errore nel contesto)
COPY . .

# Copy assets and Swagger docs generated in builder
COPY --from=builder $APP_ROOT/public ./public
COPY --from=builder $APP_ROOT/swagger ./swagger

# Install JS deps (run again per sicurezza multiarch!)
RUN yarn install --check-files

# Assets:precompile or leave it commented
# RUN SECRET_KEY_BASE=dummy RAILS_ENV=production bundle exec rails assets:precompile
# Set rights
RUN chown -R appuser:appgroup $APP_ROOT

# Switch to non-root user
USER appuser
# Entrypoint
ENTRYPOINT ["./docker-entrypoint-prod.sh"]

EXPOSE 3000