class UsersController < ApplicationController
  before_action :authenticate_user!

  def show
    @user = User.where(:subdomain => request.subdomain).first || not_found
    @post_statuses = PostStatus
                       .find_roadmap
                       .select(:id, :name, :color)

    @posts = Post
               .find_with_post_status_in(@post_statuses)
               .select(:id, :title, :board_id, :post_status_id, :user_id, :created_at)
  end

  def not_found
    raise ActionController::RoutingError.new('User Not Found')
  end
end
