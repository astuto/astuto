class CommentsController < ApplicationController
  before_action :authenticate_user!, only: [:create]
  
  def index
    comments = Comment
      .where(post_id: params[:post_id])
      .left_outer_joins(:user)
      .select('comments.id, comments.body, comments.parent_id, comments.updated_at, users.full_name as user_full_name')
      .order(updated_at: :desc)

    render json: comments
  end

  def create
    comment = Comment.new(comment_params)

    if comment.save
      render json: comment, status: :created
    else
      render json: {
        error: I18n.t('errors.comment.create', message: comment.errors.full_messages)
      }, status: :unprocessable_entity
    end
  end

  private

    def comment_params
      params
        .require(:comment)
        .permit(:body, :parent_id)
        .merge(
          user_id: current_user.id,
          post_id: params[:post_id]
        )
    end
end
