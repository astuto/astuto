class TenantMailer < ApplicationMailer
  layout :choose_layout
  skip_after_action :set_mail_from_for_multitenancy
  before_action :set_locale_to_english

  def trial_start(tenant:)
    @tenant = tenant
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
    
    @tenant = tenant
    Current.tenant = tenant

    @trial_ends_at = tenant.tenant_billing.trial_ends_at.to_date

    mail(
      from: email_from_riccardo,
      reply_to: email_from_riccardo,
      to: tenant.owner.email,
      subject: "How is it going?",
    )
  end

  def trial_end(tenant:)
    return unless Rails.application.multi_tenancy?

    @tenant = tenant
    Current.tenant = tenant

    mail(
      from: email_from_riccardo,
      reply_to: email_from_riccardo,
      to: tenant.owner.email,
      subject: "Your Astuto trial has ended",
    )
  end

  def subscription_confirmation(tenant:)
    return unless Rails.application.multi_tenancy?

    @tenant = tenant
    Current.tenant = tenant

    mail(
      from: email_from_astuto,
      to: tenant.owner.email,
      subject: "Astuto subscription confirmation"
    )
  end

  def cancellation_confirmation(tenant:)
    return unless Rails.application.multi_tenancy?

    @tenant = tenant
    Current.tenant = tenant
    @subscription_ends_at = Current.tenant.tenant_billing.subscription_ends_at.to_date

    mail(
      from: email_from_astuto,
      to: tenant.owner.email,
      subject: "Astuto subscription cancellation"
    )
  end

  def renewal_confirmation(tenant:)
    return unless Rails.application.multi_tenancy?

    @tenant = tenant
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
      "Astuto <info@astuto.io>"
    end

    def choose_layout
      action_name == 'trial_mid' || action_name == 'trial_end' ? 'mailer_no_style' : 'mailer'
    end

    def set_locale_to_english
      I18n.locale = :en
    end
end