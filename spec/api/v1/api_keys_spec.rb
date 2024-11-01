require 'swagger_helper'

RSpec.describe 'api/v1/api_keys', type: :request do
  include_context 'API Authentication'

  path '/api/v1/api_key' do

    get('Show API key') do
      description "Show the API key of the current user. <br> Requires admin role."
      security [{ api_key: [] }]
      tags 'API Keys'
      produces 'application/json'

      response(200, 'successful') do
        let(:Authorization) { "Bearer #{@admin_api_token}" }

        schema type: :object,
                properties: {
                  id: { type: :integer },
                  user_id: { type: :integer }
                },
                required: %w[id user_id]
                
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
        let(:Authorization) { "Bearer #{@moderator_api_token}" }
        schema '$ref' => '#/components/schemas/error'

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
        schema '$ref' => '#/components/schemas/error'

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
