Sidekiq.configure_server do |config|
  config.logger.level = Rails.env.production? ? Logger::INFO : Logger::DEBUG
end