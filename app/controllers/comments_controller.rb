class CommentsController < ApplicationController
  def index
    comments = Comment
      .where(post_id: params[:post_id])
      .left_outer_joins(:user)
      .select('comments.body, comments.updated_at, users.full_name')
      .order(updated_at: :desc)

    render json: comments
  end
end
