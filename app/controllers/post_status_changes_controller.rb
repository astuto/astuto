class PostStatusChangesController < ApplicationController
  def index
    post_status_changes = PostStatusChange
      .select(
        :post_status_id,
        :updated_at,
        'users.full_name as user_full_name',
        'users.email as user_email',
      )
      .where(post_id: params[:post_id])
      .left_outer_joins(:user)
      .order(updated_at: :asc)

    render json: post_status_changes
  end
end