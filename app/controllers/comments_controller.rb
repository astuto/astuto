class CommentsController < ApplicationController
  before_action :authenticate_user!, only: [:create, :update]

  def index
    comments = Comment
      .select(
        :id,
        :body,
        :parent_id,
        :is_post_update,
        :updated_at,
        'users.full_name as user_full_name',
        'users.email as user_email',
      )
      .where(post_id: params[:post_id])
      .left_outer_joins(:user)
      .order(updated_at: :desc)

    render json: comments
  end

  def create
    comment = Comment.new(comment_create_params)

    if comment.save
      SendNotificationForCommentWorkflow.new(comment: comment).run

      render json: comment.attributes.merge(
        { user_full_name: current_user.full_name, user_email: current_user.email }
      ), status: :created
    else
      render json: {
        error: comment.errors.full_messages
      }, status: :unprocessable_entity
    end
  end

  def update
    comment = Comment.find(params[:id])
    authorize comment

    if comment.update(comment_update_params)
      render json: comment.attributes.merge(
        { user_full_name: comment.user.full_name, user_email: comment.user.email }
      )
    else
      render json: {
        error: comment.errors.full_messages
      }, status: :unprocessable_entity
    end
  end

  def destroy
    comment = Comment.find(params[:id])
    authorize comment

    if comment.destroy
      render json: {
        id: comment.id,
      }, status: :accepted
    else
      render json: {
        error: comment.errors.full_messages
      }, status: :unprocessable_entity
    end
  end

  private

    def comment_create_params
      params
        .require(:comment)
        .permit(:body, :parent_id, :is_post_update)
        .merge(
          user_id: current_user.id,
          post_id: params[:post_id]
        )
    end

    def comment_update_params
      params
        .require(:comment)
        .permit(:body, :is_post_update)
    end
end
