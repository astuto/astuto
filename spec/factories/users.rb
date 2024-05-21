FactoryBot.define do
  factory :user do
    sequence(:email) { |n| "user#{n}@example.com" }

    sequence(:full_name) { |n| "User User #{n}" }
    notifications_enabled { true }
    password { 'password' }
    role { 'user' }
    sign_in_count { 10 }
  end

  factory :moderator, class: User do
    sequence(:email) { |n| "mod#{n}@example.com" }

    sequence(:full_name) { |n| "User Moderator #{n}" }
    password { 'password' }
    role { 'moderator' }
    sign_in_count { 10 }
  end

  factory :admin, class: User do
    sequence(:email) { |n| "admin#{n}@example.com" }

    sequence(:full_name) { |n| "User Admin #{n}" }
    password { 'password' }
    role { 'admin' }
    sign_in_count { 10 }
  end

  factory :owner, class: User do
    sequence(:email) { |n| "owner#{n}@example.com" }

    sequence(:full_name) { |n| "User Owner #{n}" }
    password { 'password' }
    role { 'owner' }
    sign_in_count { 10 }
  end

  factory :blocked, class: User do
    sequence(:email) { |n| "admin#{n}@example.com" }

    sequence(:full_name) { |n| "User Blocked #{n}" }
    password { 'password' }
    status { 'blocked' }
    sign_in_count { 10 }
  end

  factory :deleted, class: User do
    sequence(:email) { |n| "admin#{n}@example.com" }

    sequence(:full_name) { |n| "User Deleted #{n}" }
    password { 'password' }
    status { 'deleted' }
    sign_in_count { 10 }
  end
end
