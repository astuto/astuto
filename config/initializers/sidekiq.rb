if ENV["ACTIVE_JOB_BACKEND"] == "sidekiq"
  Sidekiq.configure_server do |config|
    redis_url = ENV["REDIS_URL"].dup
    redis_url.insert(8, ":#{ENV['REDIS_PASSWORD']}@")

    config.logger.level = Rails.env.production? ? Logger::INFO : Logger::DEBUG    
    config.redis = { url: redis_url }
  end

  Sidekiq.configure_client do |config|
    redis_url = ENV["REDIS_URL"].dup
    redis_url.insert(8, ":#{ENV['REDIS_PASSWORD']}@")

    config.logger.level = Rails.env.production? ? Logger::INFO : Logger::DEBUG
    config.redis = { url: redis_url }
  end
end