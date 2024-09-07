class InvitationMailer < ApplicationMailer
  def invite(invitation:, subject:, body:)
    Current.tenant = invitation.tenant

    to = invitation.email
    @body = body

    mail(
      to: to,
      subject: subject
    )
  end
end