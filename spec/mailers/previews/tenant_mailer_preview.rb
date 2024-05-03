# Preview all emails at http://localhost:3000/rails/mailers/tenant_mailer

class TenantMailerPreview < ActionMailer::Preview
  def initialize(params={})
    super(params)

    Current.tenant = Tenant.first
  end

  def trial_start
    TenantMailer.trial_start(tenant: Current.tenant)
  end

  def trial_mid
    TenantMailer.trial_mid(tenant: Current.tenant)
  end

  def trial_end
    TenantMailer.trial_end(tenant: Current.tenant)
  end

  def subscription_confirmation
    TenantMailer.subscription_confirmation(tenant: Current.tenant)
  end

  def cancellation_confirmation
    TenantMailer.cancellation_confirmation(tenant: Current.tenant)
  end

  def renewal_confirmation
    TenantMailer.renewal_confirmation(tenant: Current.tenant)
  end
end
