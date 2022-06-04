class UserMailer < ApplicationMailer
  layout 'user_mailer'

  def notify_post_owner(comment:)
    @comment = comment
    @user = comment.post.user

    mail(
      to: @user.email,
      subject: default_i18n_subject(app_name: app_name, post: comment.post.title)
    )
  end

  def notify_comment_owner(comment:)
    @comment = comment
    @user = comment.parent.user

    mail(
      to: @user.email,
      subject: default_i18n_subject(app_name: app_name, post: comment.post.title)
    )
  end

  def notify_followers_of_post_update(comment:)
    @comment = comment

    mail(
      to: comment.post.followers.pluck(:email),
      subject: default_i18n_subject(app_name: app_name, post: comment.post.title)
    )
  end

  def notify_followers_of_post_status_change(post:)
    @post = post

    mail(
      to: post.followers.pluck(:email),
      subject: default_i18n_subject(app_name: app_name, post: post.title)
    )
  end

  private

    def app_name
      ENV.fetch('APP_NAME')
    end
end