FactoryBot.define do
  factory :post_status do
    sequence(:name) { |n| "Post Status #{n}" }
    color { '#ffffff' }
    sequence(:order) { |n| n }
    show_in_roadmap { true }
  end
end
