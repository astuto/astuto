FactoryBot.define do
  factory :tenant_billing do
    tenant
    status { :trial }
    trial_ends_at { 7.days.from_now }
  end
end
