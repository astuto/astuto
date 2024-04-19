FactoryBot.define do
  factory :tenant_billing do
    tenant
    trial_ends_at { Time.now + 1.week }
  end
end
