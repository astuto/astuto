FactoryBot.define do
  factory :user do
    sequence(:email) { |n| "user#{n}@example.com" }

    sequence(:full_name) { |n| "User User #{n}" }
    notifications_enabled { true }
    password { 'password' }
    role { 'user' }
  end

  factory :moderator, class: User do
    sequence(:email) { |n| "mod#{n}@example.com" }

    sequence(:full_name) { |n| "User Moderator #{n}" }
    password { 'password' }
    role { 'moderator' }
  end

  factory :admin, class: User do
    sequence(:email) { |n| "admin#{n}@example.com" }

    sequence(:full_name) { |n| "User Admin #{n}" }
    password { 'password' }
    role { 'admin' }
  end

  factory :owner, class: User do
    sequence(:email) { |n| "owner#{n}@example.com" }

    sequence(:full_name) { |n| "User Owner #{n}" }
    password { 'password' }
    role { 'owner' }
  end

  factory :blocked, class: User do
    sequence(:email) { |n| "admin#{n}@example.com" }

    sequence(:full_name) { |n| "User Blocked #{n}" }
    password { 'password' }
    status { 'blocked' }
  end

  factory :deleted, class: User do
    sequence(:email) { |n| "admin#{n}@example.com" }

    sequence(:full_name) { |n| "User Deleted #{n}" }
    password { 'password' }
    status { 'deleted' }
  end
end
