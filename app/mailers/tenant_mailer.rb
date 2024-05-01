class TenantMailer < ApplicationMailer
  layout :choose_layout
  skip_after_action :set_mail_from_for_multitenancy

  def trial_started(tenant:)
    Current.tenant = tenant
    @owner = User.find_by(role: 'owner')

    mail(
      from: email_from_riccardo,
      reply_to: email_from_riccardo,
      to: @owner.email,
      subject: "Welcome to Astuto!",
    )
  end

  def subscription_confirmation(tenant:)
    Current.tenant = tenant
    @owner = User.find_by(role: 'owner')

    mail(
      from: email_from_astuto,
      to: @owner.email,
      subject: "Astuto subscription confirmation"
    )
  end

  def cancellation_confirmation(tenant:)
    Current.tenant = tenant
    @owner = User.find_by(role: 'owner')
    @subscription_ends_at = Current.tenant.tenant_billing.subscription_ends_at

    mail(
      from: email_from_astuto,
      to: @owner.email,
      subject: "Astuto subscription cancellation"
    )
  end

  def renewal_confirmation(tenant:)
    Current.tenant = tenant
    @owner = User.find_by(role: 'owner')

    mail(
      from: email_from_astuto,
      to: @owner.email,
      subject: "Astuto subscription renewal"
    )
  end

  private

    def email_from_riccardo
      "Riccardo from Astuto <info@astuto.io>"
    end

    def email_from_astuto
      "Astuto <notifications@astuto.io>"
    end

    def choose_layout
      action_name == 'trial_started' ? 'mailer_no_style' : 'mailer'
    end
end