class OAuthsController < ApplicationController
  include ApplicationHelper

  before_action :authenticate_admin

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
    @o_auth = OAuth.find(id: params[:id])
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
    @o_auth = OAuth.find(id: params[:id])
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