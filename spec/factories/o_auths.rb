FactoryBot.define do
  factory :o_auth do
    sequence(:name) { |n| "OAuth#{n}" }
    logo { "url_to_logo" }
    is_enabled { false }
    client_id { "123456" }
    client_secret { "123456" }
    authorize_url { "authorize_url" }
    token_url { "token_url" }
    profile_url { "profile_url" }
    scope { "read" }
    json_user_name_path { "user.name" }
    json_user_email_path { "user.email" }
  end
end
