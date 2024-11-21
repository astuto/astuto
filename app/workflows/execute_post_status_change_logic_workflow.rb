class ExecutePostStatusChangeLogicWorkflow
  attr_accessor :user_id, :post, :post_status_id

  def initialize(user_id:, post:, post_status_id:)
    @user_id = user_id
    @post = post
    @post_status_id = post_status_id
  end

  def run
    PostStatusChange.create(
      user_id: @user_id,
      post_id: @post.id,
      post_status_id: @post_status_id
    )

    unless @post_status_id.nil?
      @post.followers.each do |follower|
        UserMailer.notify_follower_of_post_status_change(post: @post, follower: follower).deliver_later
      end
    end
  end
end