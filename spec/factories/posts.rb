FactoryBot.define do
  factory :post do
    title { 'Post Title' }
    description { 'Post Description' }
    board
    user
    post_status
  end
end
