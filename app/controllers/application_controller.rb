class ApplicationController < ActionController::Base
  before_action :configure_permitted_parameters, if: :devise_controller?
  before_action :load_boards

  def after_sign_out_path_for(resource_or_scope)
    root_url(subdomain: false)
  end

  def after_sign_in_path_for(resource)
    users_show_url(subdomain: resource.subdomain)
  end

  protected


  def configure_permitted_parameters
    devise_parameter_sanitizer.permit(:sign_up, keys: [:full_name, :notifications_enabled,:subdomain,:role])
    devise_parameter_sanitizer.permit(:account_update, keys: [:full_name, :notifications_enabled])
  end

  def load_boards
    @boards = Board.where(id: current_user.id).select(:id, :name).order(order: :asc) if current_user.present?
  end
end
