class UserMailer < ApplicationMailer
  default from: "notifications@feedbackuser.com"

  def notify_post_owner(comment:)
    @comment = comment
    @user = comment.post.user

    mail(to: @user.email, subject: "[#{ENV.fetch('APP_NAME')}] - New comment on #{comment.post.title}")
  end

  def notify_post_owner_like(like:)
    @like = like
    @user = like.post.user

    mail(to: @user.email, subject: "[#{ENV.fetch('APP_NAME')}] - New like on #{like.post.title}")
  end
end
