class ApplicationMailer < ActionMailer::Base
  layout 'mailer'
  helper :application

  after_action :set_default_from

  private
  
    def set_default_from
      if Rails.application.multi_tenancy?
        from = "#{Current.tenant_or_raise!.site_name} <notifications@astuto.io>"
      else
        from = ENV.fetch("EMAIL_MAIL_FROM", "Astuto <notifications@astuto.io>")
      end

      mail.from = from
    end
end
