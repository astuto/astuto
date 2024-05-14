class OAuthSignInUserWorkflow
  include OAuthsHelper

  attr_accessor :user_profile, :o_auth

  # Given:
  #   user_profile: ruby Hash containing information about the user
  #                 Could've been returned from OAuthExchangeAuthCodeForProfileWorkflow
  #   o_auth: ActiveRecord model with information about the OAuth provider
  #
  # The workfow creates a new user if it doesn't exist, or select the existing one
  # NOTE: it does NOT actually sign in the user, but rather returns it to the controller
  # where it'll be signed in
  #
  # Returns:
  #   the user, if successful
  #   nil, if unsuccessful

  def initialize(user_profile: "", o_auth: "")
    @user_profile = user_profile
    @o_auth = o_auth
  end

  def run
    return nil unless @o_auth and @o_auth.class == OAuth and @o_auth.is_enabled?
    return nil unless @user_profile and (@user_profile.class == Hash or @user_profile.class == Array)

    begin
      # Attempts to get email from user_profile Hash
      email = query_path_from_object(@user_profile, @o_auth.json_user_email_path)
      
      return nil if email.nil? or not URI::MailTo::EMAIL_REGEXP.match?(email)

      # Select existing / create new user
      user = User.find_for_authentication(email: email)
      
      if user.nil?
        if not @o_auth.json_user_name_path.blank?
          full_name = query_path_from_object(@user_profile, @o_auth.json_user_name_path)
        end
        full_name ||= I18n.t('defaults.user_full_name')

        user = User.new(
          email: email,
          full_name: full_name,
          password: Devise.friendly_token,
          has_set_password: false,
          status: 'active'
        )
        user.skip_confirmation
        user.save
      end

      return user
    rescue => error
      return nil
    end
  end
end