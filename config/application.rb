require_relative 'boot'

require 'rails/all'

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)

module App
  class Application < Rails::Application
    # Initialize configuration defaults for originally generated Rails version.
    config.load_defaults 6.0

    # Settings in config/environments/* take precedence over those specified here.
    # Application configuration can go into files in config/initializers
    # -- all .rb files in that directory are automatically loaded after loading
    # the framework and any gems in your application.

    config.i18n.default_locale = :ja
    config.i18n.fallbacks = %i[ja en]
    config.i18n.available_locales = %i[ja en]
    config.time_zone = 'Tokyo'
    config.i18n.load_path += Dir[Rails.root.join('config', 'locales', '**', '*.{rb,yml}').to_s]

    def name
      ENV["APP_NAME"] || 'ASTUTO'
    end

    def email_confirmation?
      ENV["EMAIL_CONFIRMATION"] == "yes"
    end

    def show_logo?
      ENV["SHOW_LOGO"] == "yes"
    end

    def posts_per_page
      (ENV["POSTS_PER_PAGE"] || 15).to_i
    end
  end
end
