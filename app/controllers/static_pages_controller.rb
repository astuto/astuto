class StaticPagesController < ApplicationController
  def roadmap
    @post_statuses = PostStatus
      .select(:id, :name, :color)
      .where(show_in_roadmap: true)
      .order(order: :asc)

    @posts = Post
      .select(:id, :title, :board_id, :post_status_id, :user_id, :created_at)
      .where(post_status_id: get_array_of_ids(@post_statuses))
  end

  private

    def get_array_of_ids(resources)
      array_of_ids = []
      resources.each do |resource|
        array_of_ids.push resource.id
      end

      array_of_ids
    end
end