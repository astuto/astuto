require 'swagger_helper'

RSpec.describe 'api/v1/boards', type: :request do
  include_context 'API Authentication'

  before(:each) do
    @board = FactoryBot.create(:board)
  end

  path '/api/v1/boards' do

    get('List boards') do
      description 'List all boards.'
      security [{ api_key: [] }]
      tags 'Boards'
      produces 'application/json'

      response(200, 'successful') do
        let(:Authorization) { "Bearer #{@moderator_api_token}" }

        schema type: :array, items: { '$ref' => '#/components/schemas/Board' }

        include_examples 'a response with example'
        run_test!
      end

      response(401, 'unauthorized') do
        let(:Authorization) { nil }

        schema '$ref' => '#/components/schemas/error'

        include_examples 'a response with example'
        run_test!
      end
    end
  end

  path '/api/v1/boards/{id}' do

    get('Get board') do
      description 'Get the specified board.'
      security [{ api_key: [] }]
      tags 'Boards'
      produces 'application/json'

      parameter name: :id, in: :path, type: :string, required: true, description: 'ID or slug of the board'

      response(200, 'successful') do
        let(:Authorization) { "Bearer #{@moderator_api_token}" }
        let(:id) { @board.slug }

        schema '$ref' => '#/components/schemas/Board'

        include_examples 'a response with example'
        run_test!
      end

      response(404, 'not found') do
        let(:Authorization) { "Bearer #{@moderator_api_token}" }
        let(:id) { 'invalid-id' }

        schema '$ref' => '#/components/schemas/error'

        include_examples 'a response with example'
        run_test!
      end

      response(401, 'unauthorized') do
        let(:Authorization) { nil }
        let(:id) { @board.id }

        schema '$ref' => '#/components/schemas/error'

        include_examples 'a response with example'
        run_test!
      end
    end
  end
end
