require 'json'

def reload_dynamic_db_connection
  secret_path = ENV.fetch("DB_CONFIG_PATH", nil)
  if secret_path && !secret_path.empty? && File.exist?(secret_path)
    Rails.logger.info("Reload dynamic DB connection.")
    secret = JSON.parse(File.read(secret_path))
    db_config = {
      adapter:  'postgresql',
      encoding: 'unicode',
      pool:     ENV.fetch("RAILS_MAX_THREADS", 5),
      host:     secret['hostname'],
      username: secret['username'],
      password: secret['password'],
      database: ENV.fetch("POSTGRES_DBNAME", secret['dbname']),
      port:     secret['port'] || 5432
    }
    ActiveRecord::Base.establish_connection(db_config)
    Rails.logger.info("Dynamic DB connection reloaded.")
  end
end

begin
  reload_dynamic_db_connection
rescue => e
  Rails.logger.error("Error while loading dynamic db configuration: #{e.message}")
end

# Middleware per riconnessione DB su errori di connessione
class DbReconnectMiddleware
  def initialize(app)
    @app = app
  end

  def call(env)
    begin
      @app.call(env)
    rescue ActiveRecord::ConnectionNotEstablished, PG::ConnectionBad
      reload_dynamic_db_connection
      retry
    end
  end
end

Rails.application.config.middleware.insert_before 0, DbReconnectMiddleware