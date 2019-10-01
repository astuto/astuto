FactoryBot.define do
  factory :comment do
    sequence(:body) { |n| "Comment #{n}" }
    user
    post
    parent { nil }
    is_post_update { false }
  end
end
