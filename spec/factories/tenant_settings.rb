FactoryBot.define do
  factory :tenant_setting do
    tenant
    is_private { false }
  end
end
