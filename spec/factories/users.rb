FactoryBot.define do
  factory :user do
    sequence(:email) { |n| "user#{n}@example.com" }
    
    full_name { "First Last" }
    password { "password" }
  end
end
