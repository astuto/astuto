FactoryBot.define do
  factory :invitation do
    sequence(:email) { |n| "user#{n}@example.com" }
    token_digest { "my_token_digest" }
    accepted_at { "2024-09-02 15:19:45" }
    tenant
  end
end
