require 'swagger_helper'

RSpec.describe 'api/v1/api_keys', type: :request do

  before(:each) do
    # Create an admin user with an API key
    admin = FactoryBot.create(:admin)
    api_key = FactoryBot.create(:api_key, user: admin)
    @api_token = api_key.token
  end

  path '/api/v1/api_key' do

    get('show api_key') do
      security [{ api_key: [] }]

      response(200, 'successful') do
        let(:Authorization) { "Bearer #{@api_token}" }

        after do |example|
          example.metadata[:response][:content] = {
            'application/json' => {
              example: JSON.parse(response.body, symbolize_names: true)
            }
          }
        end
        run_test!
      end

      response(401, 'unauthorized') do
        let(:Authorization) { nil }

        after do |example|
          example.metadata[:response][:content] = {
            'application/json' => {
              example: JSON.parse(response.body, symbolize_names: true)
            }
          }
        end
        run_test!
      end
    end
  end
end
