class PostSettingsController < ApplicationController
  before_action :authenticate_user!, only: [:index, :show, :create, :update, :destroy]

  def index
    post_settings = PostSetting.all

    unless policy(post_settings).index?
      raise Pundit::NotAuthorizedError
    end

    render json: post_settings
  end

  def create
    @post_setting = PostSetting.new

    unless policy(@post_setting).create?
      raise Pundit::NotAuthorizedError
    end

    @post_setting.assign_attributes(post_setting_create_params)

    if @post_setting.save
      render json: @post_setting, status: :created
    else
      render json: {
        error: @post_setting.errors.full_messages
      }, status: :unprocessable_entity
    end
  end

  def show
    @post_setting = PostSetting.find(params[:id])

    unless policy(@post_setting).show?
      raise Pundit::NotAuthorizedError
    end

    respond_to do |format|
      format.html

      format.json { render json: @post_setting }
    end
  end

  def update
    @post_setting = PostSetting.find(params[:id])
    authorize @post_setting

    @post_setting.assign_attributes(post_setting_update_params)

    if @post_setting.save
      render json: @post_setting
    else
      render json: {
        error: @post_setting.errors.full_messages
      }, status: :unprocessable_entity
    end
  end

  def destroy
    @post_setting = PostSetting.find(params[:id])
    authorize @post_setting

    if @post_setting.destroy
      render json: {
        id: @post_setting.id,
      }, status: :accepted
    else
      render json: {
        error: @post_setting.errors.full_messages
      }, status: :unprocessable_entity
    end
  end

  private

    def post_setting_create_params
      params
        .require(:post_setting)
        .permit(policy(@post_setting).permitted_attributes_for_create)
    end

    def post_setting_update_params
      params
        .require(:post_setting)
        .permit(policy(@post_setting).permitted_attributes_for_update)
    end
end
