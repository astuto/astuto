# Create tenant
tenant = Tenant.create(
  site_name: 'Default Site Name',
  subdomain: 'default',
  status: 'active'
)
Current.tenant = tenant

# Create an admin user and confirm its email automatically
owner = User.create(
  full_name: 'Admin',
  email: 'admin@example.com',
  password: 'password',
  role: 'owner',
  confirmed_at: Time.zone.now
)

CreateWelcomeEntitiesWorkflow.new().run

# Let the user know how to log in with admin account
puts "A default tenant has been created with name #{tenant.site_name}"
puts 'A default admin account has been created. Credentials:'
puts "-> email: #{owner.email}"
puts "-> password: #{owner.password}"