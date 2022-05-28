FactoryBot.define do
  factory :post_status_change do
    user
    post
    post_status
  end
end
