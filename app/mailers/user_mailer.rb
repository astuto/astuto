class UserMailer < ApplicationMailer
  def notify_post_owner(comment:)
    Current.tenant = comment.tenant
    @comment = comment
    @user = comment.post.user

    mail(
      to: @user.email,
      subject: t('mailers.user.notify_post_owner.subject', site_name: site_name, post: comment.post.title)
    )
  end

  def notify_comment_owner(comment:)
    Current.tenant = comment.tenant
    @comment = comment
    @user = comment.parent.user

    mail(
      to: @user.email,
      subject: t('mailers.user.notify_comment_owner.subject', site_name: site_name, post: comment.post.title)
    )
  end

  def notify_follower_of_post_update(comment:, follower:)
    Current.tenant = comment.tenant
    @comment = comment
    @user = follower

    mail(
      to: follower.email,
      subject: t('mailers.user.notify_follower_of_post_update.subject', site_name: site_name, post: comment.post.title)
    )
  end

  def notify_follower_of_post_status_change(post:, follower:)
    Current.tenant = post.tenant
    @post = post
    @user = follower

    mail(
      to: follower.email,
      subject: t('mailers.user.notify_follower_of_post_status_change.subject', site_name: site_name, post: post.title)
    )
  end

  def recap(frequency:, user:, published_posts_count:, pending_posts_count:)
    Current.tenant = user.tenant

    @frequency = frequency
    @user = user
    @published_posts_count = published_posts_count
    @pending_posts_count = pending_posts_count

    mail(
      to: user.email,
      subject: t('mailers.user.recap.subject', site_name: site_name, frequency: frequency)
    )
  end


  private

    def site_name
      Current.tenant_or_raise!.site_name
    end
end