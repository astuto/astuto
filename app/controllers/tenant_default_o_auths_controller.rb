class TenantDefaultOAuthsController < ApplicationController
  include ApplicationHelper

  before_action :authenticate_admin, only: [:create, :destroy]

  def create
    enabled_default_oauth = TenantDefaultOAuth.new(o_auth_id: params[:o_auth_id])

    if enabled_default_oauth.save
      render json: {
        id: params[:o_auth_id]
      }, status: :created
    else
      render json: {
        error: enabled_default_oauth.errors.full_messages
      }, status: :unprocessable_entity
    end
  end

  def destroy
    enabled_default_oauth = TenantDefaultOAuth.find_by(o_auth_id: params[:o_auth_id])
    
    return if enabled_default_oauth.nil?

    if enabled_default_oauth.destroy
      render json: {
        id: params[:o_auth_id],
      }, status: :accepted
    else
      render json: {
        error: enabled_default_oauth.errors.full_messages
      }, status: :unprocessable_entity
    end
  end
end
