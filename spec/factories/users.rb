FactoryBot.define do
  factory :user do
    sequence(:email) { |n| "user#{n}@example.com" }
    
    full_name { "First Last" }
    password { "password" }
  end

  factory :moderator, class: User do
    sequence(:email) { |n| "mod#{n}@example.com" }
    
    full_name { "First Last" }
    password { "password" }
    role { "moderator" }
  end

  factory :admin, class: User do
    sequence(:email) { |n| "admin#{n}@example.com" }
    
    full_name { "First Last" }
    password { "password" }
    role { "admin" }
  end
end
