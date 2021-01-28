# Preview all emails at http://localhost:3000/rails/mailers/user_mailer
class UserMailerPreview < ActionMailer::Preview
  def notify_post_owner
    UserMailer.notify_post_owner(comment: Comment.first)
  end
end
