class UsersController < ApplicationController
  # before_action :authenticate_user!
  before_action :check_subscription,only: :show


  def buy_subscriptions
    @subscriptions = Subscription.all
  end

  def show
    @user = User.where(:subdomain => request.subdomain).first || not_found
    @boards = @user.boards.select(:id, :name).order(order: :asc)
    @post_statuses = PostStatus.find_roadmap.select(:id, :name, :color)

    @posts = Post.joins(:board).where("posts.board_id IN (?)",@boards.pluck(:id))
                 .find_with_post_status_in(@post_statuses)
                 .select(:id, :title, :board_id, :post_status_id, :user_id, :created_at)
  end

  private

  def check_subscription
    if current_user.present? && current_user.role == "moderator" && current_user.stripe_subscription_id.nil?
      if (Date.today - current_user.created_at.to_date) >= 1
        redirect_to buy_subscriptions_url
      end
    end
  end

end
