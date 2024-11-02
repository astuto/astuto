# Create an admin and moderator users with respective an API keys
# The @admin_api_token and @moderator_api_token will be available in the tests that include this shared context
RSpec.shared_context 'API Authentication', shared_context: :metadata do
  before(:each) do
    @admin = FactoryBot.create(:admin)
    admin_api_key = FactoryBot.create(:api_key, user: @admin)
    @admin_api_token = admin_api_key.token

    @moderator = FactoryBot.create(:moderator)
    moderator_api_key = FactoryBot.create(:api_key, user: @moderator)
    @moderator_api_token = moderator_api_key.token
  end
end