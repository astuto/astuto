source 'https://rubygems.org'
git_source(:github) { |repo| "https://github.com/#{repo}.git" }

ruby '3.0.6'

gem 'rake', '12.3.3'

gem 'rails', '6.1.7.8'

gem 'pg', '1.3.5'

gem 'puma', '5.6.9'

gem 'turbolinks', '5.2.1'

gem 'jbuilder', '2.11.5'

gem 'bootsnap', '1.12.0', require: false

# CSS
gem "cssbundling-rails", '1.1.2'

# JavaScript
gem 'jsbundling-rails', '1.1.1'

# HTTP requests
gem 'httparty', '0.21.0'

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

# DDoS protection
gem 'rack-attack', '6.7.0'

# Slugs
gem 'friendly_id', '5.5.1'

# Billing
gem 'stripe', '11.2.0'

group :development, :test do
  gem 'byebug', platforms: [:mri, :mingw, :x64_mingw]

  gem 'rspec-rails', '4.0.2'
  gem 'factory_bot_rails', '5.0.2'
end

group :development do
  gem 'web-console', '>= 3.3.0'
  gem 'spring', '2.1.1'
  gem 'spring-watcher-listen', '2.0.1'
end

group :test do
  # Adds support for Capybara system testing and selenium driver
  gem 'capybara', '3.36.0'
  gem 'selenium-webdriver', '4.11.0'
end

# If not bundled, webpack compilation in production fails
gem 'listen', '3.5.1'

# Windows does not include zoneinfo files, so bundle the tzinfo-data gem
gem 'tzinfo-data', platforms: [:mingw, :mswin, :x64_mingw, :jruby]
