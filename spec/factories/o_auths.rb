FactoryBot.define do
  factory :o_auth do
    sequence(:name) { |n| "OAuth#{n}" }
    logo { "https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" }
    is_enabled { false }
    client_id { "123456" }
    client_secret { "123456" }
    authorize_url { "https://example.com/authorize" }
    token_url { "https://example.com/token" }
    profile_url { "https://example.com/profile" }
    scope { "read" }
    json_user_name_path { "user.name" }
    json_user_email_path { "user.email" }
  end
end
