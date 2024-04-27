Rails.application.config.middleware.insert_before 0, Rack::Cors do
  allow do
    origins 'billing.astuto.io'#, 'billing.localhost:3000' # for development
    resource '/create_checkout_session', headers: :any, methods: [:post]
  end
end