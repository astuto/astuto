source 'https://rubygems.org'
git_source(:github) { |repo| "https://github.com/#{repo}.git" }

ruby '2.6.6'

gem 'rails', '6.0.5'

gem 'pg', '>= 0.18', '< 2.0'

gem 'puma', '~> 4.3'

gem 'sass-rails', '~> 5'

gem 'webpacker', '4.3.0'

gem 'turbolinks', '~> 5'

gem 'jbuilder', '~> 2.7'

gem 'bootsnap', '>= 1.4.2', require: false

# Authentication
gem 'devise', '4.7.3'

# Authorization
gem 'pundit', '2.2.0'

# I18n (forward locales to JS)
gem 'i18n-js'

# React
gem 'react-rails', '~> 2.6.0'

# Pagination
gem 'kaminari', '~> 1.2.1'

group :development, :test do
  gem 'byebug', platforms: [:mri, :mingw, :x64_mingw]

  gem 'rspec-rails', '~> 3.8.2'
  gem 'factory_bot_rails', '~> 5.0.2'
end

group :development do
  gem 'web-console', '>= 3.3.0'
  gem 'listen', '>= 3.0.5', '< 3.2'
  gem 'spring'
  gem 'spring-watcher-listen', '~> 2.0.0'
end

group :test do
  # Adds support for Capybara system testing and selenium driver
  gem 'capybara', '>= 2.15'
  gem 'selenium-webdriver'
  # Easy installation and use of web drivers to run system tests with browsers
  gem 'webdrivers'
end

# Windows does not include zoneinfo files, so bundle the tzinfo-data gem
gem 'tzinfo-data', platforms: [:mingw, :mswin, :x64_mingw, :jruby]
