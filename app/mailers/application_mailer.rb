class ApplicationMailer < ActionMailer::Base
  default from: "notifications@astuto.io"
  layout 'mailer'
end
