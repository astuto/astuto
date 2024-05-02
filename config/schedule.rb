set :output, { error: 'log/cron_error_log.log', standard: 'log/cron_log.log' }
set :environment, ENV['RAILS_ENV']

env 'MAILTO', ''

ENV.each { |k, v| env(k, v) }

every 1.day, at: '4:30 pm' do
  rake "notify_tenants_trial_period"
end
