class PostsController < ApplicationController
  before_action :authenticate_user!, only: [:create]

  def index
    posts = Post
      .select(:title, :description, :post_status_id)
      .where(filter_params)
      .search_by_name_or_description(params[:search])
      .page(params[:page])
    
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
      defaults = { board_id: Board.first.id }

      params
        .permit(:board_id, :post_status_id)
        .with_defaults(defaults)
    end
    
    def post_params
      params
        .require(:post)
        .permit(:title, :description, :board_id)
        .merge(user_id: current_user.id)
    end
end
