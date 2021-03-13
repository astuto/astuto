class StaticPagesController < ApplicationController

  def roadmap
    @post_statuses = PostStatus
      .find_roadmap
      .select(:id, :name, :color)

    @posts = Post
      .find_with_post_status_in(@post_statuses)
      .select(:id, :title, :board_id, :post_status_id, :user_id, :created_at)
  end

end
