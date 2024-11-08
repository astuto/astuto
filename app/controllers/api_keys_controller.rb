class ApiKeysController < ApplicationController

  before_action :authenticate_user!

  def create
    current_user.api_key&.destroy # Destroy existing API key

    @api_key = ApiKey.new(user: current_user)
    authorize @api_key

    if @api_key.save
      render json: { api_key: @api_key.token }, status: :created
    else
      render json: {
        errors: @api_key.errors.full_messages
      }, status: :unprocessable_entity
    end
  end
end