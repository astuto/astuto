class UserMailer < ApplicationMailer
  def notify_post_owner(comment:)
    @comment = comment
    @user = comment.post.user

    mail(
      to: @user.email,
      subject: "[#{ENV.fetch('APP_NAME')}] - New comment on #{comment.post.title}"
    )
  end

  def notify_comment_owner(comment:)
    @comment = comment
    @user = comment.parent.user

    mail(
      to: @user.email,
      subject: "[#{ENV.fetch('APP_NAME')}] - New reply on your comment from #{comment.post.title}"
    )
  end

  def notify_followers(comment:)
    @comment = comment

    mail(
      to: comment.post.followers.pluck(:email),
      subject: "[#{ENV.fetch('APP_NAME')}] - New update on #{comment.post.title}"
    )
  end
end