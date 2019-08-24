FactoryBot.define do
  factory :post_status do
    sequence(:name) { |n| "Post Status #{n}" }
    color { '#ffffff' }
  end
end
