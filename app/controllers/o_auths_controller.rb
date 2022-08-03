class OAuthsController < ApplicationController
  include HTTParty
  include OAuthsHelper
  include ApplicationHelper

  before_action :authenticate_admin, only: [:index, :create, :update, :destroy]

  # [subdomain.]base_url/o_auths/:id/start
  # Generates authorize url with required parameters and redirects to provider
  def start
    @o_auth = OAuth.find(params[:id])
    return unless @o_auth.is_enabled?

    # Generate random state + other query params
    token_state = Devise.friendly_token(30)
    session[:token_state] = token_state
    @o_auth.state = token_state
    @o_auth.redirect_uri = add_subdomain_to(method(:o_auth_callback_url), @o_auth.id)

    redirect_to @o_auth.authorize_url_with_query_params
  end

  # [subdomain.]base_url/o_auths/:id/callback
  # Exchange authorization code for access token, fetch user info and sign in/up
  def callback
    return unless session[:token_state] == params[:state]

    @o_auth = OAuth.find(params[:id])
    return unless @o_auth.is_enabled?

    # Exchange authorization code for access token
    token_request_params = {
      code: params[:code],
      client_id: @o_auth.client_id,
      client_secret: @o_auth.client_secret,
      grant_type: 'authorization_code',
      redirect_uri: add_subdomain_to(method(:o_auth_callback_url), @o_auth.id)
    }
    
    token_response = HTTParty.post(@o_auth.token_url, body: token_request_params)
    access_token = token_response['access_token']

    # Exchange access token for profile info
    profile_response = HTTParty.get(
      "#{@o_auth.profile_url}?access_token=#{access_token}",
      format: :json
    ).parsed_response
    
    email = query_path_from_hash(profile_response, @o_auth.json_user_email_path)

    if email.nil?
      flash[:alert] = I18n.t('errors.o_auth_login_error', { name: @o_auth.name })
      redirect_to new_user_session_path
      return
    end

    # Sign in or sign up user by email
    @user = User.find_by(email: email)

    if @user.nil?
      if not @o_auth.json_user_name_path.blank?
        full_name = query_path_from_hash(profile_response, @o_auth.json_user_name_path)
      end

      full_name ||= I18n.t('defaults.user_full_name')

      @user = User.new(email: email, full_name: full_name, password: Devise.friendly_token, status: 'active')
      @user.skip_confirmation!
      @user.save
    end
    
    sign_in @user
    flash[:notice] = I18n.t('devise.sessions.signed_in')
    redirect_to root_path
  end

  ### CRUD actions below ###

  def index
    authorize OAuth

    render json: OAuth.order(created_at: :asc)
  end

  def create
    @o_auth = OAuth.new
    @o_auth.assign_attributes(o_auth_params)
    authorize @o_auth

    if @o_auth.save
      render json: @o_auth, status: :created
    else
      render json: {
        error: @o_auth.errors.full_messages
      }, status: :unprocessable_entity
    end
  end

  def update
    @o_auth = OAuth.find(params[:id])
    authorize @o_auth

    if @o_auth.update(o_auth_params)
      render json: @o_auth
    else
      render json: {
        error: @o_auth.errors.full_messages
      }, status: :unprocessable_entity
    end
  end

  def destroy
    @o_auth = OAuth.find(params[:id])
    authorize @o_auth

    if @o_auth.destroy
      render json: {
        id: params[:id]
      }, status: :accepted
    else
      render json: {
        error: @o_auth.errors.full_messages
      }, status: :unprocessable_entity
    end
  end

  private

    def o_auth_params
      params
        .require(:o_auth)
        .permit(policy(@o_auth).permitted_attributes)
    end
end