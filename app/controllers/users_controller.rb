class UsersController < ApplicationController
  before_action :authenticate_user!, only: [:index, :update]

  def index
    authorize User
    
    @users = User.all
    if params[:search].present?
      search_term = "%#{params[:search].downcase}%"
      @users = @users.where(
        'LOWER(full_name) LIKE ? OR LOWER(email) LIKE ?',
        search_term
      )
    end
    @users = @users.where(role: params[:role]) if params[:role].present?
    @users = @users.where(blocked: params[:blocked]) if params[:blocked].present?
    @users = @users.order(role: :desc, created_at: :desc)

    render json: @users
  end

  def update
    @user = User.find(params[:id])
    authorize @user

    @user.assign_attributes user_update_params

    # Handle special case: trying to set user role to 'owner'
    raise Pundit::NotAuthorizedError if @user.owner?

    ActiveRecord::Base.transaction do
      DestroyApiKeyIfNeededWorkflow.new(user: @user).run

      if @user.save
        render json: @user
      else
        raise ActiveRecord::Rollback
      end
    rescue ActiveRecord::Rollback
      render json: {
        error: @user.errors.full_messages
      }, status: :unprocessable_entity
    end
  end

  private

    def user_update_params
      params
        .require(:user)
        .permit(policy(@user).permitted_attributes_for_update)
    end
end
