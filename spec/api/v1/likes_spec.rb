require 'swagger_helper'

RSpec.describe 'api/v1/votes', type: :request do
  include_context 'API Authentication'

  before(:each) do
    @post_1 = FactoryBot.create(:post)
    @post_2 = FactoryBot.create(:post)
    @like_1 = FactoryBot.create(:like, post: @post_1)
    @like_2 = FactoryBot.create(:like, post: @post_2)
  end

  path '/api/v1/votes' do
    get('List votes') do
      tags 'Votes'
      description 'List votes with optional filters. In particular, you may want to filter by post_id to get votes for a specific post. Votes are returned from newest to oldest.'
      security [{ api_key: [] }]
      produces 'application/json'

      parameter name: :post_id, in: :query, type: :integer, required: false, description: 'Return only votes for the specified post.'
      parameter name: :limit, in: :query, type: :integer, required: false, description: 'Limit the number of votes returned. Defaults to 100.'
      parameter name: :offset, in: :query, type: :integer, required: false, description: 'Offset the starting point of votes to return. Defaults to 0.'

      # No filters
      response(200, 'successful') do
        let(:Authorization) { "Bearer #{@moderator_api_token}" }

        schema type: :array, items: { '$ref' => '#/components/schemas/Vote' }

        before do
          @current_tenant = Current.tenant # Need to store the current tenant to use it later after request
          @likes_number = Like.count
        end

        run_test! do |response|
          data = JSON.parse(response.body)
          expect(data.length).to eq(@likes_number)
          # Check that the likes are ordered by created_at desc
          expect(data[0]['id']).to eq(@like_2.id)
          expect(data[1]['id']).to eq(@like_1.id)
        end
      end

      # Filter by post_id
      response(200, 'successful') do
        let(:Authorization) { "Bearer #{@moderator_api_token}" }
        let(:post_id) { @post_1.id }

        schema type: :array, items: { '$ref' => '#/components/schemas/Vote' }

        before do
          @current_tenant = Current.tenant # Need to store the current tenant to use it later after request
          @likes_number = Like.where(post_id: @post_1.id).count
        end

        run_test! do |response|
          data = JSON.parse(response.body)
          expect(data.length).to eq(@likes_number)
        end
      end

      response(401, 'Unauthorized') do
        let(:Authorization) { nil }

        schema '$ref' => '#/components/schemas/Error'

        run_test!
      end

    end

    post('Create a vote') do
      tags 'Votes'
      description 'Create a new vote.'
      security [{ api_key: [] }]
      consumes 'application/json'
      produces 'application/json'

      parameter name: :vote, in: :body, schema: {
        type: :object,
        properties: {
          post_id: { type: :integer, description: 'ID of the post the vote belongs to' }
        },
        required: ['post_id']
      }

      response(201, 'successful') do
        let(:Authorization) { "Bearer #{@moderator_api_token}" }
        let(:vote) { { post_id: @post_1.id } }

        schema '$ref' => '#/components/schemas/Id'

        before do
          @current_tenant = Current.tenant # Need to store the current tenant to use it later after request
          @like_count_before = Like.count
        end

        run_test! do |response|
          Current.tenant = @current_tenant # Restore the current tenant
          created_like = Like.find(JSON.parse(response.body)['id'])

          expect(Like.count).to eq(@like_count_before + 1)
          expect(created_like.post_id).to eq(vote[:post_id])
        end
      end

      response(401, 'Unauthorized') do
        let(:Authorization) { nil }
        let(:vote) { { post_id: @post_1.id } }

        schema '$ref' => '#/components/schemas/Error'

        run_test!
      end

      response(422, 'Unprocessable entity') do
        let(:Authorization) { "Bearer #{@moderator_api_token}" }
        let(:vote) { { post_id: nil } }

        schema '$ref' => '#/components/schemas/Error'

        run_test!
      end

      # Impersonation works for admin users
      response(201, 'successful') do
        let(:Authorization) { "Bearer #{@admin_api_token}" }
        let(:vote) { { post_id: @post_1.id, impersonated_user_id: FactoryBot.create(:user).id } }

        schema '$ref' => '#/components/schemas/Id'

        before do
          @current_tenant = Current.tenant # Need to store the current tenant to use it later after request
          @like_count_before = Like.count
        end

        run_test! do |response|
          Current.tenant = @current_tenant # Restore the current tenant
          created_like = Like.find(JSON.parse(response.body)['id'])

          expect(Like.count).to eq(@like_count_before + 1)
          expect(created_like.user_id).to eq(vote[:impersonated_user_id])
        end
      end

      # Impersonation does not work for moderator users
      response(401, 'Unauthorized') do
        let(:Authorization) { "Bearer #{@moderator_api_token}" }
        let(:vote) { { post_id: @post_1.id, impersonated_user_id: FactoryBot.create(:user).id } }

        schema '$ref' => '#/components/schemas/Error'
      end
    end
  end

  path '/api/v1/votes/{id}' do
    get('Show a vote') do
      tags 'Votes'
      description 'Show a vote by ID.'
      security [{ api_key: [] }]
      produces 'application/json'

      parameter name: :id, in: :path, type: :integer, required: true, description: 'ID of the vote to show.'

      response(200, 'successful') do
        let(:Authorization) { "Bearer #{@moderator_api_token}" }
        let(:id) { @like_1.id }

        schema '$ref' => '#/components/schemas/Vote'

        run_test!
      end

      response(404, 'Not found') do
        let(:Authorization) { "Bearer #{@moderator_api_token}" }
        let(:id) { 0 }

        schema '$ref' => '#/components/schemas/Error'

        run_test!
      end

      response(401, 'Unauthorized') do
        let(:Authorization) { nil }
        let(:id) { @like_1.id }

        schema '$ref' => '#/components/schemas/Error'

        run_test!
      end

    end

    delete('Delete a vote') do
      tags 'Votes'
      description 'Delete a vote by ID.'
      security [{ api_key: [] }]
      produces 'application/json'

      parameter name: :id, in: :path, type: :integer, required: true, description: 'ID of the vote to delete.'

      response(200, 'successful') do
        let(:Authorization) { "Bearer #{@moderator_api_token}" }
        let(:id) { @like_1.id }

        schema '$ref' => '#/components/schemas/Id'

        before do
          @current_tenant = Current.tenant # Need to store the current tenant to use it later after request
          @like_count_before = Like.count
        end

        run_test! do |response|
          Current.tenant = @current_tenant # Restore the current tenant
          expect(Like.count).to eq(@like_count_before - 1)
          expect { Like.find(id) }.to raise_error(ActiveRecord::RecordNotFound)
        end
      end

      response(404, 'Not found') do
        let(:Authorization) { "Bearer #{@moderator_api_token}" }
        let(:id) { 0 }

        schema '$ref' => '#/components/schemas/Error'

        run_test!
      end

      response(401, 'Unauthorized') do
        let(:Authorization) { nil }
        let(:id) { @like_1.id }

        schema '$ref' => '#/components/schemas/Error'

        run_test!
      end
    end
  end
end