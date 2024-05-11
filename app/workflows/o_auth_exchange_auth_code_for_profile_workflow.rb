class OAuthExchangeAuthCodeForProfileWorkflow
  include HTTParty

  attr_accessor :authorization_code, :o_auth

  # Given:
  #   authorization_code: code returned by OAuth provider on user confirmation
  #   o_auth: ActiveRecord model with information about the OAuth provider
  #
  # The workfow first exchanges the authorization code for an access token
  # Then it uses the access token to fetch user profile information
  #
  # Returns:
  #   The fetched user profile as a Hash, if successful
  #   nil, if unsuccessful

  def initialize(authorization_code: "", o_auth: "")
    @authorization_code = authorization_code
    @o_auth = o_auth
  end

  def request_profile(profile_url, access_token)
    HTTParty.get(
      profile_url,
      headers: { "Authorization": "Bearer #{access_token}" },
      format: :json
    ).parsed_response
  end

  def run
    return nil unless @o_auth and @o_auth.class == OAuth
    return nil unless @authorization_code and @authorization_code.class == String

    begin
      # Exchange authorization code for access token
      token_request_params = {
        code: @authorization_code,
        client_id: @o_auth.client_id,
        client_secret: @o_auth.client_secret,
        grant_type: 'authorization_code',
        redirect_uri: @o_auth.callback_url
      }
      
      token_response = HTTParty.post(
        @o_auth.token_url,
        headers: { "Accept": "application/json" },
        body: token_request_params
      )
      access_token = token_response['access_token']
      
      # Exchange access token for profile info
      PROFILE_URL_SEPARATOR = ';'
      profile_urls = @o_auth.profile_url.split(PROFILE_URL_SEPARATOR)
      if profile_urls.length == 1
        profile_response = request_profile(profile_urls[0], access_token)
      else
        profile_response = {}
        profile_urls.each_with_index do |profile_url, n|
          profile_response["profile#{n}"] = request_profile(profile_url, access_token)
        end
      end

      return profile_response
    rescue => error
      return nil
    end
  end
end