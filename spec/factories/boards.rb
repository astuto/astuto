FactoryBot.define do
  factory :board do
    sequence(:name) { |n| "Board#{n}" }
    sequence(:slug) { |n| "board#{n}" }
    description { 'My fantastic board' }
    order { 1 }
  end
end
