class SendRecapEmails < ActiveJob::Base
  queue_as :default

  def perform(*args)
    logger.info { "Performing SendRecapEmails ActiveJob" }
    
    # Fix times to 15:00 UTC
    hour = 15
    time_now = Time.now.utc.change(hour: hour, min: 0, sec: 0)
    one_day_ago = 1.day.ago.utc.change(hour: hour, min: 0, sec: 0)
    one_week_ago = 1.week.ago.utc.change(hour: hour, min: 0, sec: 0)
    one_month_ago = 1.month.ago.utc.change(hour: hour, min: 0, sec: 0)

    # Get tenants with active subscriptions
    tbs = TenantBilling.unscoped.all
    tbs = tbs.select { |tb| tb.has_active_subscription? }
    tenants = Tenant.where(id: tbs.map(&:tenant_id))

    # Based on the current date, determine which recap notifications to send
    frequencies_to_notify = ['daily']
    frequencies_to_notify.push('weekly') if Date.today.monday? # Send weekly recap on Mondays
    frequencies_to_notify.push('monthly') if Date.today.day == 1 # Send monthly recap on the 1st of the month

    tenants.each do |tenant|
      Current.tenant = tenant
      I18n.locale = tenant.locale

      # Get users with recap notifications enabled
      users = tenant.users.where(
        role: ['owner', 'admin', 'moderator'],
        notifications_enabled: true,
        recap_notification_frequency: frequencies_to_notify,
      )

      # Get the different recap notification frequencies for users
      users_recap_notification_frequencies = users.map(&:recap_notification_frequency).flatten.uniq
    
      # Get only needed posts
      if users_recap_notification_frequencies.include?('daily')
        published_posts_daily = Post.where(approval_status: 'approved', created_at: one_day_ago..time_now).to_a
        pending_posts_daily = Post.where(approval_status: 'pending', created_at: one_day_ago..time_now).to_a
      end
      if frequencies_to_notify.include?('weekly') && users_recap_notification_frequencies.include?('weekly')
        published_posts_weekly = Post.where(approval_status: 'approved', created_at: one_week_ago..time_now).to_a
        pending_posts_weekly = Post.where(approval_status: 'pending', created_at: one_week_ago..time_now).to_a
      end
      if frequencies_to_notify.include?('monthly') && users_recap_notification_frequencies.include?('monthly')
        published_posts_monthly = Post.where(approval_status: 'approved', created_at: one_month_ago..time_now).to_a
        pending_posts_monthly = Post.where(approval_status: 'pending', created_at: one_month_ago..time_now).to_a
      end

      # Notify each user based on their recap notification frequency
      users.each do |user|
        logger.info { "[#{tenant.subdomain}] Sending recap email to #{user.inspect}" }

        # Remove from published_posts the posts published by the user
        published_posts_daily_user = published_posts_daily&.select { |post| post.user_id != user.id }
        should_send_daily_recap = published_posts_daily_user&.any? || pending_posts_daily&.any?

        published_posts_weekly_user = published_posts_weekly&.select { |post| post.user_id != user.id }
        should_send_weekly_recap = published_posts_weekly_user&.any? || pending_posts_weekly&.any?

        published_posts_monthly_user = published_posts_monthly&.select { |post| post.user_id != user.id }
        should_send_monthly_recap = published_posts_monthly_user&.any? || pending_posts_monthly&.any?

        # Send recap email
        if user.recap_notification_frequency == 'daily' && should_send_daily_recap
          UserMailer.recap(
            frequency: I18n.t('common.forms.auth.recap_notification_frequency_daily'),
            user: user,
            published_posts_count: published_posts_daily_user&.count,
            pending_posts_count: pending_posts_daily&.count,
          ).deliver_later
        elsif user.recap_notification_frequency == 'weekly' && should_send_weekly_recap
          UserMailer.recap(
            frequency: I18n.t('common.forms.auth.recap_notification_frequency_weekly'),
            user: user,
            published_posts_count: published_posts_weekly_user&.count,
            pending_posts_count: pending_posts_weekly&.count,
          ).deliver_later
        elsif user.recap_notification_frequency == 'monthly' && should_send_monthly_recap
          UserMailer.recap(
            frequency: I18n.t('common.forms.auth.recap_notification_frequency_monthly'),
            user: user,
            published_posts_count: published_posts_monthly_user&.count,
            pending_posts_count: pending_posts_monthly&.count,
          ).deliver_later
        end
      end
    end
  end
end