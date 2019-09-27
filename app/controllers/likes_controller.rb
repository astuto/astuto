class LikesController < ApplicationController
  before_action :authenticate_user!

  def create
    like = Like.new(like_params)

    if like.save
      render json: like, status: :created
    else
      render json: {
        error: I18n.t('errors.likes.create', message: like.errors.full_messages)
      }, status: :unprocessable_entity
    end
  end

  def destroy
    like = Like.find_by(like_params)
    
    return if like.nil?

    if like.destroy
      render json: {}, status: :accepted
    else
      render json: {
        error: I18n.t('errors.likes.destroy', message: like.errors.full_messages)
      }, status: :unprocessable_entity
    end
  end

  private

    def like_params
      {
        post_id: params[:post_id],
        user_id: current_user.id,
      }
    end
end
