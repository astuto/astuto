Sidekiq::Cron.configure do |config|
  config.cron_schedule_file = 'config/sidekiq_cron_schedule.yml'
  
  config.cron_poll_interval = 30
  config.cron_history_size = 50
  config.default_namespace = 'default'
  config.natural_cron_parsing_mode = :strict
  
  # Handles the case when the Sidekiq process was down for a while and the cron job should have run (set to 10 minutes, i.e. 600 seconds)
  # This could happen during the deployment of a new version of the application
  config.reschedule_grace_period = 600
end