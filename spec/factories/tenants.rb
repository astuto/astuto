FactoryBot.define do
  factory :tenant do
    site_name { "MySiteName" }
    site_logo { "" }
    sequence(:subdomain) { |n| "mysubdomain#{n}" }
    locale { "en" }
    custom_domain { nil }
  end
end
