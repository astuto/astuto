class SendRecapEmails < ActiveJob::Base
  queue_as :default

  def perform(*args)
    # Get tenants with active subscriptions
    tbs = TenantBilling.unscoped.all
    tbs = tbs.select { |tb| tb.has_active_subscription? }
    tenants = Tenant.where(id: tbs.map(&:tenant_id))
    
    tenants.each do |tenant|
      # Get users with recap notifications enabled
      # users = tenant.users.where(
      #   role: ['owner', 'admin', 'moderator'],
      #   notifications_enabled: true,
      #   recap_notifications_frequency: ['daily', 'weekly', 'monthly']
      # )
    end
  end
end