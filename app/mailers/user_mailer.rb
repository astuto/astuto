class UserMailer < ApplicationMailer
  def notify_post_owner(comment:)
    @comment = comment
    @user = comment.post.user

    mail(
      to: @user.email,
      subject: "[[#{app_name}] - New comment on #{comment.post.title}"
    )
  end

  def notify_comment_owner(comment:)
    @comment = comment
    @user = comment.parent.user

    mail(
      to: @user.email,
      subject: "[[#{app_name}] - New reply on your comment from #{comment.post.title}"
    )
  end

  def notify_followers_of_post_update(comment:)
    @comment = comment

    mail(
      to: comment.post.followers.pluck(:email),
      subject: "[#{app_name}] - New update on #{comment.post.title}"
    )
  end

  def notify_followers_of_post_status_change(post:)
    @post = post

    mail(
      to: post.followers.pluck(:email),
      subject: "[#{app_name}] - Status change on post #{post.title}"
    )
  end

  private

    def app_name
      ENV.fetch('APP_NAME')
    end
end