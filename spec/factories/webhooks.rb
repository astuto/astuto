FactoryBot.define do
  factory :webhook do
    sequence(:name) { |n| "Webhook#{n}" }
    description { "Webhook description" }
    url { "http://example.com" }
    trigger { "new_post" }
    http_method { "http_post" }
    http_body { "requestbody" }
    http_headers { "" }
  end
end
