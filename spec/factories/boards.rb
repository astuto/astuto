FactoryBot.define do
  factory :board do
    sequence(:name) { |n| "Board#{n}" }
    sequence(:description) { |n| "My fantastic board #{n}" }
    sequence(:order) { |n| n }
  end
end
