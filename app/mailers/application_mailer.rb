class ApplicationMailer < ActionMailer::Base
  layout 'mailer'
  helper :application

  after_action :set_mail_from_for_multitenancy

  private
  
    def set_mail_from_for_multitenancy
      if Rails.application.multi_tenancy?
        from = "#{Current.tenant_or_raise!.site_name} <#{ENV.fetch('EMAIL_MAIL_FROM', 'notifications@astuto.io')}>"
        mail.from = from
      end
    end
end
