FactoryBot.define do
  factory :board do
    sequence(:name) { |n| "Board#{n}" }
    description { "My fantastic board" }
  end
end
