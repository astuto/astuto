require 'swagger_helper'

RSpec.describe 'api/v1/post_statuses', type: :request do
  include_context 'API Authentication'

  before(:each) do
    @post_status_1 = FactoryBot.create(:post_status)
    @post_status_2 = FactoryBot.create(:post_status)
  end

  path '/api/v1/post_statuses' do

    get('List post statuses') do
      description 'List all post statuses.'
      security [{ api_key: [] }]
      tags 'Post Statuses'
      produces 'application/json'

      response(200, 'successful') do
        let(:Authorization) { "Bearer #{@moderator_api_token}" }

        schema type: :array, items: { '$ref' => '#/components/schemas/PostStatus' }

        run_test! do |response|
          data = JSON.parse(response.body)
          expect(data.size).to eq(2)

          expect(data[0]['id']).to eq(@post_status_1.id)
          expect(data[1]['id']).to eq(@post_status_2.id)
        end
      end

      response(401, 'unauthorized') do
        let(:Authorization) { nil }

        schema '$ref' => '#/components/schemas/error'

        run_test!
      end
    end
  end
end