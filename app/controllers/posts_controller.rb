class PostsController < ApplicationController
  before_action :authenticate_user!, only: [:create, :update]

  def index
    posts = Post
      .select('posts.id, title, description, post_status_id, COUNT(comments.id) as comments_count')
      .left_outer_joins(:comments)
      .group('posts.id')
      .where(filter_params)
      .search_by_name_or_description(params[:search])
      .page(params[:page])
      .order(updated_at: :desc)
    
    render json: posts
  end

  def create
    post = Post.new(post_params)

    if post.save
      render json: post, status: :created
    else
      render json: {
        error: I18n.t('errors.post.create', message: post.errors.full_messages)
      }, status: :unprocessable_entity
    end
  end

  def show
    @post = Post.find(params[:id])
    @post_statuses = PostStatus.select(:id, :name, :color).order(order: :asc)

    respond_to do |format|
      format.html

      format.json { render json: @post }
    end
  end

  def update
    post = Post.find(params[:id])
    
    if !current_user.power_user? && current_user.id != post.user_id
      render json: I18n.t('errors.unauthorized'), status: :unauthorized
      return
    end

    post.post_status_id = params[:post][:post_status_id]

    if post.save
      render json: post, status: :no_content
    else
      render json: {
        error: I18n.t('errors.post.update', message: post.errors.full_messages)
      }, status: :unprocessable_entity
    end
  end

  private
  
    def filter_params
      defaults = { board_id: Board.first.id }

      params
        .permit(:board_id, :post_status_id, :page, :search)
        .with_defaults(defaults)
        .except(:page, :search)
    end
    
    def post_params
      params
        .require(:post)
        .permit(:title, :description, :board_id)
        .merge(user_id: current_user.id)
    end
end
