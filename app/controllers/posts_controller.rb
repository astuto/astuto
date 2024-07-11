class PostsController < ApplicationController
  before_action :authenticate_user!, only: [:create, :update, :destroy]
  before_action :authenticate_moderator_if_post_not_approved, only: [:show]
  before_action :check_tenant_subscription, only: [:create, :update, :destroy]

  def index
    start_date = params[:start_date] ? Date.parse(params[:start_date]) : Date.parse('1970-01-01')
    end_date = params[:end_date] ? Date.parse(params[:end_date]) : Date.today

    posts = Post
      .select(
        :id,
        :title,
        :slug,
        :description,
        :post_status_id,
        'COUNT(DISTINCT likes.id) AS likes_count',
        'COUNT(DISTINCT comments.id) AS comments_count',
        '((LOG(COUNT(DISTINCT likes.id) + 1) + LOG(COUNT(DISTINCT comments.id) + 1)) + (EXTRACT(EPOCH FROM posts.created_at) / 45000)) AS hotness',
        "(SELECT COUNT(*) AS liked FROM likes WHERE likes.user_id=#{current_user ? current_user.id : -1} AND likes.post_id=posts.id)"
      )
      .left_outer_joins(:likes)
      .left_outer_joins(:comments)
      .group('posts.id')
      .where(board_id: params[:board_id] || Board.first.id)
      .where(created_at: start_date.beginning_of_day..end_date.end_of_day)
      .where(approval_status: "approved")
      .search_by_name_or_description(params[:search])
      .order_by(params[:sort_by])
      .page(params[:page])

    # apply post status filter if present
    posts = posts.where(post_status_id: params[:post_status_ids].map { |id| id == "0" ? nil : id }) if params[:post_status_ids].present?
    
    render json: posts
  end

  def create
    # honeypot fields check
    if params[:post][:dnf1] != "" || params[:post][:dnf2] != ""
      render json: {
        error: t('errors.unknown')
      }, status: :unprocessable_entity
      return
    end

    # remove fields dnf1 and dnf2 from params
    params[:post].delete(:dnf1)
    params[:post].delete(:dnf2)

    @post = Post.new
    @post.assign_attributes(post_create_params)

    if @post.save
      Follow.create(post_id: @post.id, user_id: current_user.id)
      
      render json: @post, status: :created
    else
      render json: {
        error: @post.errors.full_messages
      }, status: :unprocessable_entity
    end
  end

  def show
    @post = Post
      .friendly
      .select(
        :id,
        :title,
        :slug,
        :description,
        :approval_status,
        :board_id,
        :user_id,
        :post_status_id,
        :created_at,
        :updated_at,
        'users.email as user_email',
        'users.full_name as user_full_name'
      )
      .joins(:user)
      .find(params[:id])
    
    @post_statuses = PostStatus.select(:id, :name, :color).order(order: :asc)
    @board = @post.board

    @page_title = @post.title.length > 60 ? @post.title.slice(0, 60) + "..." : @post.title

    respond_to do |format|
      format.html

      format.json { render json: @post }
    end
  end

  def update
    @post = Post.find(params[:id])
    authorize @post
    
    @post.assign_attributes(post_update_params)

    if @post.save
      if @post.post_status_id_previously_changed?
        PostStatusChange.create(
          user_id: current_user.id,
          post_id: @post.id,
          post_status_id: @post.post_status_id
        )
  
        @post.followers.each do |follower|
          UserMailer.notify_follower_of_post_status_change(post: @post, follower: follower).deliver_later
        end
      end

      render json: @post
    else
      render json: {
        error: @post.errors.full_messages
      }, status: :unprocessable_entity
    end
  end

  def destroy
    @post = Post.find(params[:id])
    authorize @post

    if @post.destroy
      render json: {
        id: @post.id,
      }, status: :accepted
    else
      render json: {
        error: @post.errors.full_messages
      }, status: :unprocessable_entity
    end
  end

  private

    def authenticate_moderator_if_post_not_approved
      post = Post.friendly.find(params[:id])
      authenticate_moderator unless post.approval_status == "approved"
    end
    
    def post_create_params
      params
        .require(:post)
        .permit(policy(@post).permitted_attributes_for_create)
        .merge(user_id: current_user.id)
    end

    def post_update_params
      params
        .require(:post)
        .permit(policy(@post).permitted_attributes_for_update)
    end
end
