FactoryBot.define do
  factory :tenant_billing do
    tenant
    trial_ends_at { Time.current + 7.days }
  end
end
