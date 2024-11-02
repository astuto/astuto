require 'swagger_helper'

RSpec.describe 'api/v1/posts', type: :request do
  include_context 'API Authentication'

  before(:each) do
    @post = FactoryBot.create(:post)
  end

  path '/api/v1/posts' do
    get('List posts') do
      description 'List posts with optional filters.'
      security [{ api_key: [] }]
      tags 'Posts'
      produces 'application/json'

      parameter name: :limit, in: :query, type: :integer, required: false, description: 'Number of posts to return. Defaults to 20.'
      parameter name: :offset, in: :query, type: :integer, required: false, description: 'Offset the starting point of posts to return. Defaults to 0.'
      parameter name: :board_id, in: :query, type: :integer, required: false, description: 'If specified, only posts from this board will be returned.'
      parameter name: :user_id, in: :query, type: :integer, required: false, description: 'If specified, only posts from this user will be returned.'

      response(200, 'successful') do
        let(:Authorization) { "Bearer #{@moderator_api_token}" }

        schema type: :array, items: { '$ref' => '#/components/schemas/Post' }

        run_test!
      end

      response(401, 'unauthorized') do
        let(:Authorization) { nil }

        schema '$ref' => '#/components/schemas/error'

        run_test!
      end
    end

    post('Create post') do
      description 'Create a new post.'
      security [{ api_key: [] }]
      tags 'Posts'
      consumes 'application/json'
      produces 'application/json'

      parameter name: :post_parameter, in: :body, schema: {
        type: :object,
        properties: {
          title: { type: :string, description: 'Title of the post' },
          description: { type: :string, description: 'Content of the post' },
          board_id: { type: :integer, description: 'ID of the board where the post will be created' },
          impersonated_user_id: { type: :integer, nullable: true, description: 'ID of the user to impersonate (optional; requires admin role)' }
        },
        required: %w[title board_id]
      }

      response(201, 'successful') do
        let(:Authorization) { "Bearer #{@moderator_api_token}" }
        let(:post_parameter) { { title: 'New post', board_id: FactoryBot.create(:board).id } }

        schema '$ref' => '#/components/schemas/Id'

        before do
          @current_tenant = Current.tenant # Need to store the current tenant to use it later after request
          @post_count_before = Post.count
        end

        run_test! do |response|
          Current.tenant = @current_tenant # Restore the current tenant
          created_post = Post.find(JSON.parse(response.body)['id'])

          expect(Post.count).to eq(@post_count_before + 1)
          expect(created_post.title).to eq(post_parameter[:title])
          expect(created_post.board_id).to eq(post_parameter[:board_id])
          expect(created_post.user_id).to eq(@moderator.id)
        end
      end

      response(400, 'bad request') do
        let(:Authorization) { "Bearer #{@moderator_api_token}" }
        let(:post_parameter) { { title: nil } }

        schema '$ref' => '#/components/schemas/error'

        run_test!
      end

      response(401, 'unauthorized') do
        let(:Authorization) { nil }
        let(:post_parameter) { { title: 'New post', board_id: FactoryBot.create(:board).id } }

        schema '$ref' => '#/components/schemas/error'

        run_test!
      end

      # Impersonation works for admin users
      response(201, 'successful') do
        let(:Authorization) { "Bearer #{@admin_api_token}" }
        let(:post_parameter) { { title: 'New post', board_id: FactoryBot.create(:board).id, impersonated_user_id: FactoryBot.create(:user).id } }

        schema '$ref' => '#/components/schemas/Id'

        before do
          @current_tenant = Current.tenant # Need to store the current tenant to use it later after request
          @post_count_before = Post.count
        end

        run_test! do |response|
          Current.tenant = @current_tenant # Restore the current tenant
          created_post = Post.find(JSON.parse(response.body)['id'])

          expect(Post.count).to eq(@post_count_before + 1)
          expect(created_post.title).to eq(post_parameter[:title])
          expect(created_post.board_id).to eq(post_parameter[:board_id])
          expect(created_post.user_id).to eq(post_parameter[:impersonated_user_id])
        end
      end

      # Impersonation doesn't work for non-admin users
      response(401, 'unauthorized') do
        let(:Authorization) { "Bearer #{@moderator_api_token}" }
        let(:post_parameter) { { title: 'New post', board_id: FactoryBot.create(:board).id, impersonated_user_id: FactoryBot.create(:user).id } }

        schema '$ref' => '#/components/schemas/error'

        run_test!
      end
    end
  end

  path '/api/v1/posts/{id}' do
    get('Get a post') do
      description 'Get a post by id.'
      security [{ api_key: [] }]
      tags 'Posts'
      produces 'application/json'

      parameter name: :id, in: :path, type: :integer, required: true, description: 'ID of the post.'

      response(200, 'successful') do
        let(:Authorization) { "Bearer #{@moderator_api_token}" }
        let(:id) { @post.id }

        schema '$ref' => '#/components/schemas/Post'

        run_test!
      end

      response(401, 'unauthorized') do
        let(:Authorization) { nil }
        let(:id) { @post.id }

        schema '$ref' => '#/components/schemas/error'

        run_test!
      end

      response(404, 'not found') do
        let(:Authorization) { "Bearer #{@moderator_api_token}" }
        let(:id) { -1 }

        schema '$ref' => '#/components/schemas/error'

        run_test!
      end
    end

    put('Update a post') do
      description 'Update a post.'
      security [{ api_key: [] }]
      tags 'Posts'
      consumes 'application/json'
      produces 'application/json'

      parameter name: :id, in: :path, type: :integer, required: true, description: 'ID of the post.'

      parameter name: :post, in: :body, schema: {
        type: :object,
        properties: {
          title: { type: :string, description: 'New title of the post' },
          description: { type: :string, description: 'New content of the post' }
        },
      }

      response(200, 'successful') do
        let(:Authorization) { "Bearer #{@moderator_api_token}" }
        let(:id) { @post.id }
        let(:post) { { title: 'New title', description: 'New description' } }

        schema '$ref' => '#/components/schemas/Id'

        before do
          @current_tenant = Current.tenant # Need to store the current tenant to use it later after request
          expect(@post.title).not_to eq('New title')
          expect(@post.description).not_to eq('New description')
        end

        run_test! do |response|
          Current.tenant = @current_tenant # Restore the current tenant
          @post = Post.find(@post.id)
          expect(@post.title).to eq('New title')
          expect(@post.description).to eq('New description')
        end
      end

      response(401, 'unauthorized') do
        let(:Authorization) { nil }
        let(:id) { @post.id }
        let(:post) { { title: 'New title', description: 'New description' } }

        schema '$ref' => '#/components/schemas/error'

        run_test!
      end

      response(404, 'not found') do
        let(:Authorization) { "Bearer #{@moderator_api_token}" }
        let(:id) { -1 }
        let(:post) { { title: 'New title', description: 'New description' } }

        schema '$ref' => '#/components/schemas/error'

        run_test!
      end
    end

    delete('Delete a post') do
      description 'Delete a post.'
      security [{ api_key: [] }]
      tags 'Posts'

      parameter name: :id, in: :path, type: :integer, required: true, description: 'ID of the post.'

      response(200, 'successful') do
        let(:Authorization) { "Bearer #{@moderator_api_token}" }
        let(:id) { @post.id }

        schema '$ref' => '#/components/schemas/Id'

        before do
          @current_tenant = Current.tenant # Need to store the current tenant to use it later after request
          expect(Post.find_by(id: @post.id)).to be_present
        end

        run_test! do |response|
          Current.tenant = @current_tenant # Restore the current tenant
          expect(Post.find_by(id: @post.id)).to be_nil
        end
      end

      response(401, 'unauthorized') do
        let(:Authorization) { nil }
        let(:id) { @post.id }

        schema '$ref' => '#/components/schemas/error'

        run_test!
      end

      response(404, 'not found') do
        let(:Authorization) { "Bearer #{@moderator_api_token}" }
        let(:id) { -1 }

        schema '$ref' => '#/components/schemas/error'

        run_test!
      end
    end
  end

  path '/api/v1/posts/{id}/update_board' do
    put('Update post board') do
      description 'Move post to another board.'
      security [{ api_key: [] }]
      tags 'Posts'
      consumes 'application/json'
      produces 'application/json'

      parameter name: :id, in: :path, type: :integer, required: true, description: 'ID of the post.'

      parameter name: :post, in: :body, schema: {
        type: :object,
        properties: {
          board_id: { type: :integer, description: 'ID of the new board' }
        },
        required: %w[board_id]
      }

      response(200, 'successful') do
        let(:Authorization) { "Bearer #{@moderator_api_token}" }
        let(:id) { @post.id }
        let(:post) { { board_id: FactoryBot.create(:board).id } }

        schema '$ref' => '#/components/schemas/Id'

        before do
          @current_tenant = Current.tenant # Need to store the current tenant to use it later after request
          expect(@post.board_id).not_to eq(post[:board_id])
        end

        run_test! do |response|
          Current.tenant = @current_tenant # Restore the current tenant
          @post = Post.find(@post.id)
          expect(@post.board_id).to eq(post[:board_id])
        end
      end

      response(400, 'bad request') do
        let(:Authorization) { "Bearer #{@moderator_api_token}" }
        let(:id) { @post.id }
        let(:post) { { board_id: nil } }

        schema '$ref' => '#/components/schemas/error'

        run_test!
      end

      response(401, 'unauthorized') do
        let(:Authorization) { nil }
        let(:id) { @post.id }
        let(:post) { { board_id: FactoryBot.create(:board).id } }

        schema '$ref' => '#/components/schemas/error'

        run_test!
      end

      response(404, 'not found') do
        let(:Authorization) { "Bearer #{@moderator_api_token}" }
        let(:id) { -1 }
        let(:post) { { board_id: FactoryBot.create(:board).id } }

        schema '$ref' => '#/components/schemas/error'

        run_test!
      end
    end
  end

  path '/api/v1/posts/{id}/update_status' do
    put('Update post status') do
      description 'Update post status.'
      security [{ api_key: [] }]
      tags 'Posts'
      consumes 'application/json'
      produces 'application/json'

      parameter name: :id, in: :path, type: :integer, required: true, description: 'ID of the post.'

      parameter name: :post, in: :body, schema: {
        type: :object,
        properties: {
          post_status_id: { type: :integer, description: 'ID of the new post status. Send null if you want to remove current status.' }
        },
        required: %w[post_status_id]
      }

      response(200, 'successful') do
        let(:Authorization) { "Bearer #{@moderator_api_token}" }
        let(:id) { @post.id }
        let(:post) { { post_status_id: FactoryBot.create(:post_status).id } }

        schema '$ref' => '#/components/schemas/Id'

        before do
          @current_tenant = Current.tenant # Need to store the current tenant to use it later after request
          expect(@post.post_status_id).not_to eq(post[:post_status_id])
        end

        run_test! do |response|
          Current.tenant = @current_tenant # Restore the current tenant
          @post = Post.find(@post.id)
          expect(@post.post_status_id).to eq(post[:post_status_id])
        end
      end

      response(401, 'unauthorized') do
        let(:Authorization) { nil }
        let(:id) { @post.id }
        let(:post) { { post_status_id: FactoryBot.create(:post_status).id } }

        schema '$ref' => '#/components/schemas/error'

        run_test!
      end

      response(404, 'not found') do
        let(:Authorization) { "Bearer #{@moderator_api_token}" }
        let(:id) { -1 }
        let(:post) { { post_status_id: FactoryBot.create(:post_status).id } }

        schema '$ref' => '#/components/schemas/error'

        run_test!
      end
    end
  end
end