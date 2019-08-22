FactoryBot.define do
  factory :board do
    sequence(:name) { |n| "Board#{n}" }
    description { "My fantastic board" }
  end

  factory :noname_board, class: Board do
    name { "" }
    description { "This board has no name :O" }
  end
end
