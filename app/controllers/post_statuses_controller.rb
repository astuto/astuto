class PostStatusesController < ApplicationController
  def index
    post_statuses = PostStatus.order(order: :asc)

    render json: post_statuses
  end
end