# frozen_string_literal: true

class Users::OmniauthCallbacksController < Devise::OmniauthCallbacksController
  # skip_before_action :authenticate
  # skip_before_action :authenticate_user!
  # skip_before_action :require_agreement_for_terms_of_service

  def scs
    @user = User.from_omniauth(request.env['omniauth.auth'])
    cookies.encrypted[:user_id] = @user.id
    sign_in_and_redirect @user, event: :authentication
  end

  def after_sign_in_path_for(resource)
    path = session[:return_to] || root_path
    session.delete(:return_to)
    path
  end

  def failure
    redirect_to new_user_session_path
  end
end
