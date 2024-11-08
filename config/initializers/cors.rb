Rails.application.config.middleware.insert_before 0, Rack::Cors do
  # Allow requests from any origin to the API documentation
  # Needed for the Swagger UI (Redocusaurus in astuto-docs) to work
  allow do
    origins '*'
    resource '/api-docs/*',
      headers: :any,
      methods: [:get, :post, :options, :put, :delete]
  end
end