if ENV['ACTIVE_JOB_BACKEND'] == 'sidekiq'
  Sidekiq.configure_server do |config|
    redis_url = ENV['REDIS_URL'].dup
    redis_url.insert(8, ":#{ENV['REDIS_PASSWORD']}@")

    config.logger.level = Rails.env.production? ? Logger::INFO : Logger::DEBUG    
    config.redis = { url: redis_url }
  end

  Sidekiq.configure_client do |config|
    redis_url = ENV['REDIS_URL'].dup
    redis_url.insert(8, ":#{ENV['REDIS_PASSWORD']}@")

    config.logger.level = Rails.env.production? ? Logger::INFO : Logger::DEBUG
    config.redis = { url: redis_url }
  end

  # Sidekiq Cron
  if ENV['IS_SIDEKIQ'] == 'true'
    Sidekiq::Cron.configure do |config|

      # config.cron_schedule_file doesn't work for some reason
      # so we have to create the cron jobs manually
      unless Sidekiq::Cron::Job.find('SendRecapEmails')
        cron_expression = '0 15 * * *' # Every day at 15:00
        # cron_expression = '*/30 * * * * *' # Every 30 seconds (for testing)
        Sidekiq::Cron::Job.create(name: 'SendRecapEmails Job', cron: cron_expression, class: 'SendRecapEmails')
      end
      
      config.cron_poll_interval = Rails.env.production? ? 30 : 15
      config.cron_history_size = 50
      config.default_namespace = 'default'
      config.natural_cron_parsing_mode = :strict
      
      # Handles the case when the Sidekiq process was down for a while and the cron job should have run (set to 10 minutes, i.e. 600 seconds)
      # This could happen during the deployment of a new version of the application
      config.reschedule_grace_period = 600
    end
  end
end