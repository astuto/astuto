class PostsController < ApplicationController
  before_action :authenticate_user!

  def create
    post = Post.new(post_params)
    post.user_id = current_user.id

    if post.save
      render json: { status: 'success' }
    else
      render json: { status: 'error', message: post.errors.full_messages }
    end
  end

  private

    def post_params
      params.require(:post).permit(:title, :description, :board_id)
    end
end
