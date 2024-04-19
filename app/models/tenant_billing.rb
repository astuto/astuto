class TenantBilling < ApplicationRecord
  include TenantOwnable

  belongs_to :tenant

  before_create :set_trial_ends_at

  enum status: [
    :trial,
    :active,
    :canceled,
    :perpetual
  ]

  def has_active_subscription?
    perpetual? || active? || (trial? && trial_ends_at > Time.current)
  end

  private

    def set_trial_ends_at
      self.trial_ends_at = Time.current + Rails.application.trial_period_days
    end
end
