class TenantBilling < ApplicationRecord
  include TenantOwnable

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
    perpetual? || (active? && subscription_ends_at+1.day > Time.current) || (canceled? && subscription_ends_at > Time.current) || (trial? && trial_ends_at > Time.current)
  end

  private

    def set_trial_ends_at
      self.trial_ends_at = Time.current + Rails.application.trial_period_days
    end

    def set_subscription_ends_at
      self.subscription_ends_at = Time.current
    end
end
