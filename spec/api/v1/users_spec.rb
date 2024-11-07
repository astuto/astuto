require 'swagger_helper'

RSpec.describe 'api/v1/users', type: :request do
  include_context 'API Authentication'

  before(:each) do
    @user = FactoryBot.create(:user)
    @admin = FactoryBot.create(:admin)
    @moderator = FactoryBot.create(:moderator)
  end

  path '/api/v1/users' do

    get('List users') do
      tags 'Users'
      description 'List users with optional filters. Users are returned from newest to oldest.'
      security [{ api_key: [] }]
      produces 'application/json'

      parameter name: :limit, in: :query, type: :integer, required: false, description: 'Number of users to return. Defaults to 50.'
      parameter name: :offset, in: :query, type: :integer, required: false, description: 'Offset the starting point of users to return. Defaults to 0.'

      response(200, 'successful') do
        let(:Authorization) { "Bearer #{@moderator_api_token}" }

        schema type: :array, items: { '$ref' => '#/components/schemas/User' }

        run_test!
      end

      response(401, 'Unauthorized') do
        let(:Authorization) { nil }

        schema '$ref' => '#/components/schemas/Error'

        run_test!
      end
    end

    post('Create user') do
      tags 'Users'
      description 'Create a new user. A password will be randomly generated, so the user will be able to log in using an OAuth provider or by email after resetting the password.'
      security [{ api_key: [] }]
      consumes 'application/json'
      produces 'application/json'

      parameter name: :user, in: :body, schema: {
        type: :object,
        properties: {
          email: { type: :string, description: 'Email of the user' },
          full_name: { type: :string, description: 'Full name of the user' }
        },
        required: %w[email full_name]
      }

      response(201, 'created') do
        let(:Authorization) { "Bearer #{@moderator_api_token}" }
        let(:user) { { email: 'new-user@example.com', full_name: 'New User' } }

        schema '$ref' => '#/components/schemas/Id'

        before do
          @current_tenant = Current.tenant # Need to store the current tenant to use it later after request
          @user_count_before = User.count
        end

        run_test! do |response|
          Current.tenant = @current_tenant # Restore the current tenant
          created_user = User.find(JSON.parse(response.body)['id'])

          expect(User.count).to eq(@user_count_before + 1)
          expect(created_user.email).to eq(user[:email])
          expect(created_user.full_name).to eq(user[:full_name])
        end
      end

      response(401, 'unauthorized') do
        let(:Authorization) { nil }
        let(:user) { { email: 'new-user@example.com', full_name: 'New User' } }

        schema '$ref' => '#/components/schemas/Error'

        run_test!
      end

      # e.g. email already taken
      response(422, 'unprocessable entity') do
        let(:Authorization) { "Bearer #{@moderator_api_token}" }
        let(:user) { { email: @user.email, full_name: 'New User' } }

        schema '$ref' => '#/components/schemas/Error'

        run_test!
      end

    end

  end

  path '/api/v1/users/{id}' do

    get('Get user') do
      tags 'Users'
      description 'Get a user by id.'
      security [{ api_key: [] }]
      produces 'application/json'

      parameter name: :id, in: :path, type: :string, required: true, description: 'User ID'

      # With user ID
      response(200, 'successful') do
        let(:Authorization) { "Bearer #{@moderator_api_token}" }
        let(:id) { @user.id }

        schema '$ref' => '#/components/schemas/User'

        run_test!
      end

      response(401, 'unauthorized') do
        let(:Authorization) { nil }
        let(:id) { @user.id }

        schema '$ref' => '#/components/schemas/Error'

        run_test!
      end

      response(404, 'not found') do
        let(:Authorization) { "Bearer #{@moderator_api_token}" }
        let(:id) { 0 }

        schema '$ref' => '#/components/schemas/Error'

        run_test!
      end
    end
  end

  path '/api/v1/users/get_by_email' do

    get('Get user by email') do
      tags 'Users'
      description 'Get a user by email. You can specify email both as a query parameter or in the request body.'
      security [{ api_key: [] }]
      produces 'application/json'

      parameter name: :email, in: :query, type: :string, required: true, description: 'User email'

      response(200, 'successful') do
        let(:Authorization) { "Bearer #{@moderator_api_token}" }
        let(:email) { @user.email }

        schema '$ref' => '#/components/schemas/User'

        run_test!
      end

      response(401, 'unauthorized') do
        let(:Authorization) { nil }
        let(:email) { @user.email }

        schema '$ref' => '#/components/schemas/Error'

        run_test!
      end

      response(404, 'not found') do
        let(:Authorization) { "Bearer #{@moderator_api_token}" }
        let(:email) { '' }

        schema '$ref' => '#/components/schemas/Error'

        run_test!
      end
    end
  end

  path '/api/v1/users/{id}/block' do
    put('Block user') do
      tags 'Users'
      description 'Block a user.'
      security [{ api_key: [] }]
      produces 'application/json'

      parameter name: :id, in: :path, type: :string, required: true, description: 'User ID'

      response(200, 'successful') do
        let(:Authorization) { "Bearer #{@moderator_api_token}" }
        let(:id) { @user.id }

        schema '$ref' => '#/components/schemas/Id'

        before do
          @user_status_before = @user.status
          expect(@user.status).to eq('active')
        end

        run_test! do |response|
          @user.reload
          expect(@user.status).to eq('blocked')
        end
      end

      # Admin can block moderator
      response(200, 'successful') do
        let(:Authorization) { "Bearer #{@admin_api_token}" }
        let(:id) { @moderator.id }

        schema '$ref' => '#/components/schemas/Id'

        before do
          @moderator_status_before = @moderator.status
          expect(@moderator.status).to eq('active')
        end

        run_test! do |response|
          @moderator.reload
          expect(@moderator.status).to eq('blocked')
        end
      end

      response(401, 'unauthorized') do
        let(:Authorization) { nil }
        let(:id) { @user.id }

        schema '$ref' => '#/components/schemas/Error'

        run_test!
      end

      # Moderator cannot block admin
      response(401, 'unauthorized') do
        let(:Authorization) { "Bearer #{@moderator_api_token}" }
        let(:id) { @admin.id }

        schema '$ref' => '#/components/schemas/Error'

        run_test!
      end

      # Nobody cannot block themselves
      response(401, 'unauthorized') do
        let(:Authorization) { "Bearer #{@moderator_api_token}" }
        let(:id) { @moderator.id }

        schema '$ref' => '#/components/schemas/Error'

        run_test!
      end

      response(404, 'not found') do
        let(:Authorization) { "Bearer #{@moderator_api_token}" }
        let(:id) { 0 }

        schema '$ref' => '#/components/schemas/Error'

        run_test!
      end
    end
  end
end