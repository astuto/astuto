FactoryBot.define do
  factory :tenant_billing do
    tenant
    trial_end_date { Time.current + 7.days }
  end
end
