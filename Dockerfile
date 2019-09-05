FROM ruby:2.6.3

RUN curl -sL https://deb.nodesource.com/setup_11.x | bash -
RUN apt-get update -qq && apt-get install -y nodejs postgresql-client
RUN npm install -g yarn

# Install Chrome (needed by Capybara). TODO: optional installation, only if development
RUN wget https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb
RUN dpkg -i google-chrome-stable_current_amd64.deb; apt-get -fy install

RUN mkdir /app
WORKDIR /app

# Ruby language server
RUN gem install solargraph

# Launch processes in Procfile
RUN gem install foreman

COPY Gemfile /app/Gemfile
COPY Gemfile.lock /app/Gemfile.lock
RUN bundle install

RUN yarn install --check-files

COPY . /app

# Add a script to be executed every time the container starts.
ENTRYPOINT ["/app/docker-entrypoint.sh"]

EXPOSE 3000

# Start the main process.
CMD ["foreman", "start", "-p", "3000"]
