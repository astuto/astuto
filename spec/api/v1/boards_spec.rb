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

        run_test!
      end

      response(401, 'unauthorized') do
        let(:Authorization) { nil }

        schema '$ref' => '#/components/schemas/Error'

        run_test!
      end
    end

    post('Create board') do
      description 'Create a new board.<br><br><b>Note</b>: requires admin role.'
      security [{ api_key: [] }]
      tags 'Boards'
      consumes 'application/json'
      produces 'application/json'

      parameter name: :board, in: :body, schema: {
        type: :object,
        properties: {
          name: { type: :string, description: 'Name of the board' },
          slug: { type: :string, nullable: true, description: 'URL-friendly identifier for the board (optional; if not provided, one will be created automatically from provided board name)' },
          description: { type: :string, nullable: true, description: 'Description of the board (optional)' },
        },
        required: ['name']
      }

      response(201, 'successful') do
        let(:Authorization) { "Bearer #{@admin_api_token}" }
        let(:board) { { name: 'New board' } }

        schema '$ref' => '#/components/schemas/Id'

        before do
          @current_tenant = Current.tenant # Need to store the current tenant to use it later after request
          @board_count_before = Board.count
        end

        run_test! do |response|
          Current.tenant = @current_tenant # Restore the current tenant
          data = JSON.parse(response.body)
          
          expect(Board.count).to eq(@board_count_before + 1)
          expect(Board.find(data['id'])).to be_present
        end
      end

      response(400, 'bad request') do
        let(:Authorization) { "Bearer #{@admin_api_token}" }
        let(:board) { { description: 'Only description, not name' } }

        schema '$ref' => '#/components/schemas/Error'

        run_test!
      end

      response(401, 'unauthorized') do
        let(:Authorization) { "Bearer #{@moderator_api_token}" }
        let(:board) { { name: 'New board' } }

        schema '$ref' => '#/components/schemas/Error'

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

      # Test with slug
      response(200, 'successful') do
        let(:Authorization) { "Bearer #{@moderator_api_token}" }
        let(:id) { @board.slug }

        schema '$ref' => '#/components/schemas/Board'

        run_test! do |response|
          data = JSON.parse(response.body)
          expect(data['id']).to eq(@board.id)
          expect(data['name']).to eq(@board.name)
        end
      end

      # Test with id
      response(200, 'successful') do
        let(:Authorization) { "Bearer #{@moderator_api_token}" }
        let(:id) { @board.id }

        schema '$ref' => '#/components/schemas/Board'

        run_test! do |response|
          data = JSON.parse(response.body)
          expect(data['id']).to eq(@board.id)
          expect(data['name']).to eq(@board.name)
        end
      end

      response(404, 'not found') do
        let(:Authorization) { "Bearer #{@moderator_api_token}" }
        let(:id) { 'invalid-id' }

        schema '$ref' => '#/components/schemas/Error'

        run_test!
      end

      response(401, 'unauthorized') do
        let(:Authorization) { nil }
        let(:id) { @board.id }

        schema '$ref' => '#/components/schemas/Error'

        run_test!
      end
    end
  end
end
