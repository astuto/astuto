FactoryBot.define do
  factory :comment do
    sequence(:body) { |n| "Comment #{n}" }
    user
    post
    parent { nil }
  end
end
