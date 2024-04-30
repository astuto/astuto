class TenantMailer < ApplicationMailer
  def subscription_confirmation(tenant:)
    Current.tenant = tenant
    @owner = User.find_by(role: 'owner')

    mail(
      to: @owner.email,
      from: email_from,
      subject: "Astuto subscription confirmation"
    )
  end

  def cancellation_confirmation(tenant:)
    Current.tenant = tenant
    @owner = User.find_by(role: 'owner')
    @subscription_ends_at = Current.tenant.tenant_billing.subscription_ends_at

    mail(
      to: @owner.email,
      from: email_from,
      subject: "Astuto subscription cancellation"
    )
  end

  def renewal_confirmation(tenant:)
    Current.tenant = tenant
    @owner = User.find_by(role: 'owner')

    mail(
      to: @owner.email,
      from: email_from,
      subject: "Astuto subscription renewal"
    )
  end

  private

    def email_from
      "Astuto <notifications@astuto.io>"
    end
end