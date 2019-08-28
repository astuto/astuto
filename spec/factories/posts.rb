FactoryBot.define do
  factory :post do
    sequence(:title) { |n| "Post #{n}" }
    description { 'Post Description' }
    board
    user
    post_status
  end
end
