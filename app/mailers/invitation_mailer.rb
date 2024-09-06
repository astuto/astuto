class InvitationMailer < ApplicationMailer
  def invite(to:, subject:, body:)
    @body = body

    mail(
      to: to,
      subject: subject
    )
  end
end