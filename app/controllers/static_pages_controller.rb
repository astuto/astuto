class StaticPagesController < ApplicationController
  skip_before_action :load_tenant_data, only: [:showcase]

  def showcase
    render html: 'Showcase home page.'
  end

  def roadmap
    @post_statuses = PostStatus
      .find_roadmap
      .select(:id, :name, :color)

    @posts = Post
      .find_with_post_status_in(@post_statuses)
      .select(:id, :title, :board_id, :post_status_id, :user_id, :created_at)
  end
end