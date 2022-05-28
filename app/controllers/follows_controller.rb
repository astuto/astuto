class FollowsController < ApplicationController
  before_action :authenticate_user!, only: [:create, :destroy]

  def index
    unless user_signed_in?
      render json: { }
      return
    end

    follow = Follow.find_by(follow_params)
    render json: follow
  end

  def create
    follow = Follow.new(follow_params)

    if follow.save
      render json: {
        id: follow.id
      }, status: :created
    else
      render json: {
        error: I18n.t('errors.follows.create', message: follow.errors.full_messages)
      }, status: :unprocessable_entity
    end
  end

  def destroy
    follow = Follow.find_by(follow_params)
    id = follow.id
    
    return if follow.nil?

    if follow.destroy
      render json: {
        id: id,
      }, status: :accepted
    else
      render json: {
        error: I18n.t('errors.follow.destroy', message: follow.errors.full_messages)
      }, status: :unprocessable_entity
    end
  end

  private

    def follow_params
      {
        post_id: params[:post_id],
        user_id: current_user.id,
      }
    end
end