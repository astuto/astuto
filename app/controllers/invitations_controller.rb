class InvitationsController < ApplicationController
  before_action :authenticate_admin
  # before_action :check_tenant_subscription, only: [:create]

  def create
    to = invitation_params[:to].split(',').map(&:strip).select { |email| URI::MailTo::EMAIL_REGEXP.match?(email) }
    subject = invitation_params[:subject]
    body = invitation_params[:body]

    num_invitations_sent = 0

    to.each do |email|
      invitation_token = SecureRandom.hex(16)
      invitation_token_digest = Digest::SHA256.hexdigest(invitation_token)

      # skip if user already registered
      next if User.find_by(email: email).present?

      invitation = Invitation.find_or_initialize_by(email: email)

      # skip if invitation already exists and accepted
      next if invitation.persisted? && invitation.accepted_at.present?

      invitation.token_digest = invitation_token_digest
      invitation.save!

      # replace %link% placeholder in body with the invitation link
      body_with_link = body.gsub('%link%', get_url_for(method(:new_user_registration_url), options: { invitation_token: invitation_token, email: email }))

      InvitationMailer.invite(to: email, subject: subject, body: body_with_link).deliver_later

      num_invitations_sent += 1
    end

    status = num_invitations_sent > 0 ? :ok : :unprocessable_entity
    render json: { num_invitations_sent: num_invitations_sent }, status: status
  end

  def test
    to = invitation_params[:to]
    subject = invitation_params[:subject]
    body = invitation_params[:body]

    invitation_token = SecureRandom.hex(16)
    subject = "[TEST] " + subject
    body_with_link = body.gsub('%link%', get_url_for(method(:new_user_registration_url), options: { invitation_token: invitation_token, email: to }))

    InvitationMailer.invite(to: to, subject: subject, body: body_with_link).deliver_later

    render json: {}, status: :ok
  end


  private

    def invitation_params
      params.require(:invitations).tap do |invitation|
        invitation.require(:to)
        invitation.require(:subject)
        invitation.require(:body)
      end
    end
end