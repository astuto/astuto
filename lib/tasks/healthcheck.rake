require 'rake'
require 'net/http'
require 'uri'

task :healthcheck, [:port] do |t, args|
  # Assign the port value from args or use the default
  port = args[:port] || 3000

  # Make the HTTP request to the health endpoint
  uri = URI.parse("http://localhost:#{port}/health")
  response = Net::HTTP.get_response(uri)
  
  # Print and return exit code
  exit_code = response.is_a?(Net::HTTPSuccess) ? 0 : 1
  puts "Healthcheck returned: #{exit_code.to_s}"

  exit(exit_code)
end
