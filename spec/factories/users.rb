FactoryBot.define do
  factory :user do
    sequence(:email) { |n| "user#{n}@example.com" }

    full_name { 'First Last' }
    notifications_enabled { true }
    password { 'password' }
  end

  factory :moderator, class: User do
    sequence(:email) { |n| "mod#{n}@example.com" }

    full_name { 'First Last' }
    password { 'password' }
    role { 'moderator' }
  end

  factory :admin, class: User do
    sequence(:email) { |n| "admin#{n}@example.com" }

    full_name { 'First Last' }
    password { 'password' }
    role { 'admin' }
  end

  factory :blocked, class: User do
    sequence(:email) { |n| "admin#{n}@example.com" }

    full_name { 'First Last' }
    password { 'password' }
    status { 'blocked' }
  end

  factory :deleted, class: User do
    sequence(:email) { |n| "admin#{n}@example.com" }

    full_name { 'First Last' }
    password { 'password' }
    status { 'deleted' }
  end
end
