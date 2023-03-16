source 'https://rubygems.org'
git_source(:github) { |repo| "https://github.com/#{repo}.git" }

ruby '2.6.6'
gem 'rake', '12.3.3'

gem 'rails', '6.0.5'

gem 'pg', '1.3.5'

gem 'puma', '4.3.12'

gem 'webpacker', '4.3.0'

gem 'turbolinks', '5.2.1'

gem 'jbuilder', '2.11.5'

gem 'bootsnap', '1.12.0', require: false

# HTTP requests
gem 'httparty', '0.18.0'

# Authentication
gem 'devise', '4.7.3'

# Authorization
gem 'pundit', '2.2.0'

# I18n (forward locales to JS)
gem 'i18n-js', '3.9.2'

# React
gem 'react-rails', '2.6.2'

# Pagination
gem 'kaminari', '1.2.2'

group :development, :test do
  gem 'byebug', platforms: [:mri, :mingw, :x64_mingw]

  gem 'rspec-rails', '3.8.3'
  gem 'factory_bot_rails', '5.0.2'
end

group :development do
  gem 'web-console', '>= 3.3.0'
  gem 'spring'
  gem 'spring-watcher-listen', '~> 2.0.0'
end

group :test do
  # Adds support for Capybara system testing and selenium driver
  gem 'capybara', '3.36.0'
  gem 'selenium-webdriver', '4.1.0'
  # Easy installation and use of web drivers to run system tests with browsers
  gem 'webdrivers', '5.0.0'
end

# If not bundled, webpack compilation in production fails
gem 'listen', '>= 3.0.5', '< 3.2'

# Windows does not include zoneinfo files, so bundle the tzinfo-data gem
gem 'tzinfo-data', platforms: [:mingw, :mswin, :x64_mingw, :jruby]
