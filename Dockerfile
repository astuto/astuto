FROM ruby:2.6.3

RUN curl -sL https://deb.nodesource.com/setup_11.x | bash -
RUN apt-get update -qq && apt-get install -y nodejs postgresql-client
RUN npm install -g yarn

# Install Chrome (needed by Capybara). TODO: optional installation, only if development
RUN wget https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb
RUN dpkg -i google-chrome-stable_current_amd64.deb; apt-get -fy install

RUN mkdir /app
WORKDIR /app

# Launch processes in Procfile
RUN gem install foreman

# Copy Gemfile and install gems
COPY Gemfile* /app/
RUN bundle install

# Copy package.json and install packages
COPY package.json yarn.lock /app/
RUN yarn install --check-files

COPY . /app

# Add a script to be executed every time the container starts.
ENTRYPOINT ["/app/docker-entrypoint.sh"]

EXPOSE 3000

# No default CMD is provided in Dockerfile
