FactoryBot.define do
  factory :post do
    sequence(:title) { |n| "Post #{n}" }
    sequence(:description) { |n| "Post #{n} description" }
    board
    user
    post_status
  end
end
