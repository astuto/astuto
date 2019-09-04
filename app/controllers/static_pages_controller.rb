class StaticPagesController < ApplicationController
  def roadmap
    @post_statuses = PostStatus
      .select(:id, :name, :color)
      .where(show_in_roadmap: true)
      .order(order: :asc)

    @posts = Post
      .select(:id, :title, :board_id, :post_status_id, :user_id, :created_at)
      .where(post_status_id: @post_statuses.pluck(:id))
  end
end