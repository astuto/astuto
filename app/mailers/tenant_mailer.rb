class TenantMailer < ApplicationMailer
  layout :choose_layout
  skip_after_action :set_mail_from_for_multitenancy

  def trial_start(tenant:)
    Current.tenant = tenant

    mail(
      from: email_from_riccardo,
      reply_to: email_from_riccardo,
      to: tenant.owner.email,
      subject: "Welcome to Astuto!",
    )
  end

  def trial_mid(tenant:)
    return unless Rails.application.multi_tenancy?
    
    Current.tenant = tenant

    mail(
      from: email_from_riccardo,
      reply_to: email_from_riccardo,
      to: tenant.owner.email,
      subject: "Your Astuto trial is ending soon",
    )
  end

  def trial_end(tenant:)
    return unless Rails.application.multi_tenancy?

    Current.tenant = tenant

    mail(
      from: email_from_riccardo,
      reply_to: email_from_riccardo,
      to: tenant.owner.email,
      subject: "Your Astuto trial has ended",
    )
  end

  def subscription_confirmation(tenant:)
    Current.tenant = tenant

    mail(
      from: email_from_astuto,
      to: tenant.owner.email,
      subject: "Astuto subscription confirmation"
    )
  end

  def cancellation_confirmation(tenant:)
    Current.tenant = tenant
    @subscription_ends_at = Current.tenant.tenant_billing.subscription_ends_at

    mail(
      from: email_from_astuto,
      to: tenant.owner.email,
      subject: "Astuto subscription cancellation"
    )
  end

  def renewal_confirmation(tenant:)
    Current.tenant = tenant

    mail(
      from: email_from_astuto,
      to: tenant.owner.email,
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
      action_name == 'trial_start' || action_name == 'trial_mid' || action_name == 'trial_end' ? 'mailer_no_style' : 'mailer'
    end
end