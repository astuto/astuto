class PostsController < ApplicationController
  # before_action :authenticate_user!

  def index_by_board_id
    board_id = params[:board_id] || 1
    
    posts = Post
      .left_outer_joins(:post_status)
      .select('posts.title, posts.description, post_statuses.name as post_status_name, post_statuses.color as post_status_color')
      .where(board_id: board_id)
    
      render json: posts
  end

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
