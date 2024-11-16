Sidekiq::Cron.configure do |config|
  config.cron_poll_interval = 15
  config.cron_schedule_file = 'config/sidekiq_cron_schedule.yml'
  config.cron_history_size = 50
  config.default_namespace = 'default'
  config.natural_cron_parsing_mode = :strict
  config.reschedule_grace_period = 300 # Default is 60
end