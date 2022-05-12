class UserMailer < ApplicationMailer
  def notify_post_owner(comment:)
    @comment = comment
    @user = comment.post.user

    mail(to: @user.email, subject: "[#{ENV.fetch('APP_NAME')}] - New comment on #{comment.post.title}")
  end
end