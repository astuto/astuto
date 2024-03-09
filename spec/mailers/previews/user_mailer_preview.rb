# Preview all emails at http://localhost:3000/rails/mailers/user_mailer

class UserMailerPreview < ActionMailer::Preview
  def notify_post_owner
    Current.tenant = Tenant.first
    UserMailer.notify_post_owner(comment: Comment.first)
  end

  def notify_comment_owner
    Current.tenant = Tenant.first
    comment = Comment.where.not(parent_id: nil).first || throw("No comment replies available")
    UserMailer.notify_comment_owner(comment: comment)
  end

  def notify_followers_of_post_update
    Current.tenant = Tenant.first
    UserMailer.notify_followers_of_post_update(comment: Comment.first)
  end

  def notify_followers_of_post_status_change
    Current.tenant = Tenant.first
    UserMailer.notify_followers_of_post_status_change(post: Post.first)
  end
end
