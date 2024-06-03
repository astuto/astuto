class TenantBilling < ApplicationRecord
  include TenantOwnable
  extend FriendlyId

  friendly_id :generate_random_slug, use: :slugged

  belongs_to :tenant

  before_create :set_trial_ends_at
  before_create :set_subscription_ends_at

  enum status: [
    :trial,
    :active,
    :canceled,
    :perpetual
  ]

  def has_active_subscription?
    perpetual? || (active? && subscription_ends_at+1.day > Time.current) || (canceled? && subscription_ends_at > Time.current) || (trial? && trial_ends_at > Time.current) || Rails.application.multi_tenancy? == false
  end

  def generate_auth_token
    self.auth_token = SecureRandom.urlsafe_base64
    self.save!
    auth_token
  end

  def invalidate_auth_token
    self.auth_token = nil
    self.save!
  end

  private

    def set_trial_ends_at
      self.trial_ends_at = Time.current + Rails.application.trial_period_days
    end

    def set_subscription_ends_at
      self.subscription_ends_at = Time.current
    end

    def generate_random_slug
      loop do
        self.slug = SecureRandom.hex(16)
        break unless self.class.exists?(slug: slug)
      end
      slug
    end
end
