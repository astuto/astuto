FactoryBot.define do
  factory :comment do
    body { "MyText" }
    user
    post
    parent { nil }
  end
end
