require 'rails_helper'
include ActiveSupport::Testing::TimeHelpers

RSpec.describe SendRecapEmails, type: :job do
  before do
    @hour_of_execution = 15

    @admin = FactoryBot.create(:user, role: 'admin', notifications_enabled: true)
    allow(UserMailer).to receive(:recap).and_call_original
  end

  it 'sends a daily recap email with published posts count and pending posts count' do
    @admin.recap_notification_frequency = 'daily'
    @admin.save

    # Published posts
    FactoryBot.create(:post, approval_status: 'approved', created_at: 23.hours.ago)
    FactoryBot.create(:post, approval_status: 'approved', created_at: 16.hours.ago)
    FactoryBot.create(:post, approval_status: 'approved', created_at: 30.hours.ago) # Should not be included in recap

    # Pending posts
    FactoryBot.create(:post, approval_status: 'pending', created_at: 23.hours.ago)
    FactoryBot.create(:post, approval_status: 'pending', created_at: 30.hours.ago) # Should not be included in recap

    SendRecapEmails.perform_now(@hour_of_execution)
    expect(UserMailer).to have_received(:recap).with(
      frequency: 'Daily',
      user: @admin,
      published_posts_count: 2,
      pending_posts_count: 1
    ).once
  end

  it 'sends a recap email for every owner/admin/mod with notifications enabled and recap_notification_frequency set' do
    @admin.recap_notification_frequency = 'daily'
    @admin.save
    owner = FactoryBot.create(:user, role: 'owner', notifications_enabled: true, recap_notification_frequency: 'daily')
    mod = FactoryBot.create(:user, role: 'moderator', notifications_enabled: false, recap_notification_frequency: 'daily') # Should not receive recap

    # Published posts
    FactoryBot.create(:post, approval_status: 'approved', created_at: 23.hours.ago)
    FactoryBot.create(:post, approval_status: 'approved', created_at: 16.hours.ago)
    FactoryBot.create(:post, approval_status: 'approved', created_at: 30.hours.ago) # Should not be included in recap

    # Pending posts
    FactoryBot.create(:post, approval_status: 'pending', created_at: 23.hours.ago)
    FactoryBot.create(:post, approval_status: 'pending', created_at: 30.hours.ago) # Should not be included in recap

    SendRecapEmails.perform_now(@hour_of_execution)
    expect(UserMailer).to have_received(:recap).with(
      frequency: 'Daily',
      user: @admin,
      published_posts_count: 2,
      pending_posts_count: 1
    ).once
    expect(UserMailer).to have_received(:recap).with(
      frequency: 'Daily',
      user: owner,
      published_posts_count: 2,
      pending_posts_count: 1
    ).once
    expect(UserMailer).not_to have_received(:recap).with(
      frequency: 'Daily',
      user: mod,
      published_posts_count: 2,
      pending_posts_count: 1
    )
  end

  it 'sends a weekly recap email with published posts count and pending posts count on Monday' do
    @admin.recap_notification_frequency = 'weekly'
    @admin.save

    travel_to Time.zone.local(2024, 11, 18, 10, 0, 0) do # Monday
      # Published posts
      FactoryBot.create(:post, approval_status: 'approved', created_at: 2.days.ago)
      FactoryBot.create(:post, approval_status: 'approved', created_at: 6.days.ago)
      FactoryBot.create(:post, approval_status: 'approved', created_at: 10.days.ago) # Should not be included in recap

      # Pending posts
      FactoryBot.create(:post, approval_status: 'pending', created_at: 1.minute.ago)
      FactoryBot.create(:post, approval_status: 'pending', created_at: 6.days.ago)
      FactoryBot.create(:post, approval_status: 'pending', created_at: 10.days.ago) # Should not be included in recap

      SendRecapEmails.perform_now(@hour_of_execution)
      expect(UserMailer).to have_received(:recap).with(
        frequency: 'Weekly',
        user: @admin,
        published_posts_count: 2,
        pending_posts_count: 2
      ).once
    end
  end

  it 'does not send a weekly recap email on days other than Monday' do
    @admin.recap_notification_frequency = 'weekly'
    @admin.save

    travel_to Time.zone.local(2024, 11, 19, 10, 0, 0) do # Tuesday
      SendRecapEmails.perform_now(@hour_of_execution)
      expect(UserMailer).not_to have_received(:recap)
    end

    travel_to Time.zone.local(2024, 11, 20, 10, 0, 0) do # Wednesday
      SendRecapEmails.perform_now(@hour_of_execution)
      expect(UserMailer).not_to have_received(:recap)
    end

    travel_to Time.zone.local(2024, 11, 21, 10, 0, 0) do # Thursday
      SendRecapEmails.perform_now(@hour_of_execution)
      expect(UserMailer).not_to have_received(:recap)
    end

    travel_to Time.zone.local(2024, 11, 22, 10, 0, 0) do # Friday
      SendRecapEmails.perform_now(@hour_of_execution)
      expect(UserMailer).not_to have_received(:recap)
    end

    travel_to Time.zone.local(2024, 11, 23, 10, 0, 0) do # Saturday
      SendRecapEmails.perform_now(@hour_of_execution)
      expect(UserMailer).not_to have_received(:recap)
    end

    travel_to Time.zone.local(2024, 11, 24, 10, 0, 0) do # Sunday
      SendRecapEmails.perform_now(@hour_of_execution)
      expect(UserMailer).not_to have_received(:recap)
    end
  end

  it 'sends a monthly recap email with published posts count and pending posts count on the first day of the month' do
    @admin.recap_notification_frequency = 'monthly'
    @admin.save

    travel_to Time.zone.local(2024, 11, 1, 10, 0, 0) do # First day of the month
      # Published posts
      FactoryBot.create(:post, approval_status: 'approved', created_at: 1.hour.ago)
      FactoryBot.create(:post, approval_status: 'approved', created_at: 2.days.ago)
      FactoryBot.create(:post, approval_status: 'approved', created_at: 3.weeks.ago)
      FactoryBot.create(:post, approval_status: 'approved', created_at: 2.months.ago) # Should not be included in recap

      # Pending posts
      FactoryBot.create(:post, approval_status: 'pending', created_at: 2.days.ago)
      FactoryBot.create(:post, approval_status: 'pending', created_at: 2.months.ago) # Should not be included in recap

      SendRecapEmails.perform_now(@hour_of_execution)

      expect(UserMailer).to have_received(:recap).with(
        frequency: 'Monthly',
        user: @admin,
        published_posts_count: 3,
        pending_posts_count: 1
      ).once
    end
  end
end