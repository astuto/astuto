class LikesController < ApplicationController
  before_action :authenticate_user!, only: [:create, :destroy]

  def index
    likes = Like
      .select(
        :id,
        :full_name,
        :email
      )
      .left_outer_joins(:user)
      .where(post_id: params[:post_id])

      render json: likes
  end

  def create
    like = Like.new(like_params)

    if like.save
      render json: {
        id: like.id,
        full_name: current_user.full_name,
        email: current_user.email,
      }, status: :created
    else
      render json: {
        error: like.errors.full_messages
      }, status: :unprocessable_entity
    end
  end

  def destroy
    like = Like.find_by(like_params)
    id = like.id
    
    return if like.nil?

    if like.destroy
      render json: {
        id: id,
      }, status: :accepted
    else
      render json: {
        error: like.errors.full_messages
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
