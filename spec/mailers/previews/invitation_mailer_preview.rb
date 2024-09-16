# Preview all emails at http://localhost:3000/rails/mailers/invitation_mailer

class InvitationMailerPreview < ActionMailer::Preview
  def initialize(params={})
    super(params)

    Current.tenant = Tenant.first
  end

  def invite
    InvitationMailer.invite(to: 'test@example.com', subject: 'Invitation', body: 'Invitation body')
  end
end