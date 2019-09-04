class PostsController < ApplicationController
  before_action :authenticate_user!, only: [:create]

  def index_by_board_id
    board_id = params[:board_id] || 1

    
    posts = Post
      .left_outer_joins(:post_status)
      .select('posts.title, posts.description, post_statuses.name as post_status_name, post_statuses.color as post_status_color')
      .where(filter_params)
    
    render json: posts
  end

  def create
    post = Post.new(post_params)

    if post.save
      render json: post, status: :no_content
    else
      render json: {
        error: I18n.t('errors.post.create', message: post.errors.full_messages)
      }, status: :unprocessable_entity
    end
  end

  private
  
    def filter_params
      params.permit(:board_id, :post_status_id)
    end
    
    def post_params
      params
        .require(:post)
        .permit(:title, :description, :board_id)
        .merge(user_id: current_user.id)
    end

end
