# Preview all emails at http://localhost:3000/rails/mailers/user_mailer

class UserMailerPreview < ActionMailer::Preview
  def initialize(params={})
    super(params)

    Current.tenant = Tenant.first
  end

  def notify_post_owner
    UserMailer.notify_post_owner(comment: Comment.first)
  end

  def notify_comment_owner
    comment = Comment.where.not(parent_id: nil).first || throw("No comment replies available")
    UserMailer.notify_comment_owner(comment: comment)
  end

  def notify_follower_of_post_update
    comment = Comment.first
    if comment.post.follows.empty?
      throw("No followers available")
    end
    follower = comment.post.follows.first.user
    UserMailer.notify_follower_of_post_update(comment: comment, follower: follower)
  end

  def notify_follower_of_post_status_change
    comment = Comment.first
    if comment.post.follows.empty?
      throw("No followers available")
    end
    follower = comment.post.follows.first.user
    UserMailer.notify_follower_of_post_status_change(post: Post.first, follower: follower)
  end

  def recap
    UserMailer.recap(
      frequency: I18n.t('common.forms.auth.recap_notification_frequency_daily'),
      user: User.first,
      published_posts_count: 3,
      pending_posts_count: 2,
    )
  end
end
