class UserMailer < ApplicationMailer
  layout 'user_mailer'

  def notify_post_owner(comment:)
    @tenant = comment.tenant
    Current.tenant = @tenant
    @comment = comment
    @user = comment.post.user

    mail(
      to: @user.email,
      subject: t('mailers.user.notify_post_owner.subject', site_name: site_name, post: comment.post.title)
    )
  end

  def notify_comment_owner(comment:)
    @tenant = comment.tenant
    Current.tenant = @tenant
    @comment = comment
    @user = comment.parent.user

    mail(
      to: @user.email,
      subject: t('mailers.user.notify_comment_owner.subject', site_name: site_name, post: comment.post.title)
    )
  end

  def notify_followers_of_post_update(comment:)
    @tenant = comment.tenant
    Current.tenant = @tenant
    @comment = comment

    mail(
      to: comment.post.followers.pluck(:email),
      subject: t('mailers.user.notify_followers_of_post_update.subject', site_name: site_name, post: comment.post.title)
    )
  end

  def notify_followers_of_post_status_change(post:)
    @tenant = post.tenant
    Current.tenant = @tenant
    @post = post

    mail(
      to: post.followers.pluck(:email),
      subject: t('mailers.user.notify_followers_of_post_status_change.subject', site_name: site_name, post: post.title)
    )
  end

  private

    def site_name
      Current.tenant_or_raise!.site_name
    end
end