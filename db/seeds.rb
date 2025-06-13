# Create tenant
tenant = Tenant.create(
  site_name: 'Default Site Name',
  subdomain: 'default',
  status: 'active'
)
Current.tenant = tenant

# Use email and password provided in environment variables or default values
admin_email = ENV.fetch('ADMIN_EMAIL', 'admin@example.com')
admin_password = ENV.fetch('ADMIN_PASSWORD', 'password')
# Create an admin user and confirm its email automatically
owner = User.create(
  full_name: 'Admin',
  email: admin_email,
  password: admin_password,
  role: 'owner',
  confirmed_at: Time.zone.now
)

tenant.tenant_billing = TenantBilling.create!(status: 'perpetual')

CreateWelcomeEntitiesWorkflow.new().run

# Let the user know how to log in with admin account
puts "A default tenant has been created with name #{tenant.site_name}"
puts 'A default admin account has been created. Credentials:'
puts "-> email: #{owner.email}"
puts "-> password: #{owner.password}"