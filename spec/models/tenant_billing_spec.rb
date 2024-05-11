require 'rails_helper'

RSpec.describe TenantBilling, type: :model do
  let(:tenant_billing) { FactoryBot.build(:tenant_billing) }

  it 'should be valid' do
    expect(tenant_billing).to be_valid
  end

  it 'has a status that can be trial, active, canceled or perpetual (default: trial)' do
    expect(tenant_billing.status).to eq('trial')

    tenant_billing.status = 'active'
    expect(tenant_billing).to be_valid

    tenant_billing.status = 'canceled'
    expect(tenant_billing).to be_valid

    tenant_billing.status = 'perpetual'
    expect(tenant_billing).to be_valid
  end

  it 'has a trial_ends_at datetime that defaults to TRIAL_PERIOD_DAYS env variable' do
    tenant_billing.save
    expect(tenant_billing.trial_ends_at).to be_within(5.seconds).of(Time.current + Rails.application.trial_period_days)
  end

  it 'has a subscription_ends_at datetime that defaults to current time' do
    tenant_billing.save
    expect(tenant_billing.subscription_ends_at).to be_within(5.seconds).of(Time.current)
  end

  it 'has a has_active_subscription? method that returns true if tenant can access the service' do
    tenant_billing.status = 'perpetual'
    expect(tenant_billing.has_active_subscription?).to be_truthy

    tenant_billing.status = 'active'
    tenant_billing.subscription_ends_at = Time.current + 1.day
    expect(tenant_billing.has_active_subscription?).to be_truthy

    tenant_billing.subscription_ends_at = Time.current - 1.day - 1.second
    expect(tenant_billing.has_active_subscription?).to be_falsey

    tenant_billing.status = 'trial'
    tenant_billing.trial_ends_at = Time.current + 1.day
    expect(tenant_billing.has_active_subscription?).to be_truthy

    tenant_billing.trial_ends_at = Time.current - 1.day
    expect(tenant_billing.has_active_subscription?).to be_falsey
  end

  it 'has a soft expiration of 1 day if in status "active"' do
    tenant_billing.status = 'active'
    tenant_billing.subscription_ends_at = Time.current - 23.hours - 59.minutes - 59.seconds
    expect(tenant_billing.has_active_subscription?).to be_truthy
  end
end
