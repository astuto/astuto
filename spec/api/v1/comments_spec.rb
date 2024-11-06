require 'swagger_helper'

RSpec.describe 'api/v1/comments', type: :request do
  include_context 'API Authentication'

  before(:each) do
    @post_1 = FactoryBot.create(:post)
    @post_2 = FactoryBot.create(:post)
    @comment_1 = FactoryBot.create(:comment, post: @post_1)
    @comment_2 = FactoryBot.create(:comment, post: @post_1)
  end

  path '/api/v1/comments' do

    get('List comments') do
      description 'List comments with optional filters. In particular, you may want to filter by post_id to get comments for a specific post.'
      security [{ api_key: [] }]
      tags 'Comments'
      produces 'application/json'

      parameter name: :post_id, in: :query, type: :integer, required: false, description: 'Return only comments for the specified post.'
      parameter name: :limit, in: :query, type: :integer, required: false, description: 'Number of comments to return. Defaults to 100.'
      parameter name: :offset, in: :query, type: :integer, required: false, description: 'Offset the starting point of comments to return. Defaults to 0.'

      # No filters
      response(200, 'successful') do
        let(:Authorization) { "Bearer #{@moderator_api_token}" }

        schema type: :array, items: { '$ref' => '#/components/schemas/Comment' }

        before do
          @current_tenant = Current.tenant # Need to store the current tenant to use it later after request
          @comments_number = Comment.count
        end

        run_test! do |response|
          data = JSON.parse(response.body)
          expect(data.length).to eq(@comments_number)
          # Check that the comments are ordered by created_at desc
          expect(data[0]['id']).to eq(@comment_2.id)
          expect(data[1]['id']).to eq(@comment_1.id)
        end
      end

      # Filter by post_id
      response(200, 'successful') do
        let(:Authorization) { "Bearer #{@moderator_api_token}" }
        let(:post_id) { @post_1.id }

        schema type: :array, items: { '$ref' => '#/components/schemas/Comment' }

        before do
          @current_tenant = Current.tenant # Need to store the current tenant to use it later after request
          @comments_number = Comment.where(post_id: @post_1.id).count
        end

        run_test! do |response|
          data = JSON.parse(response.body)
          expect(data.length).to eq(@comments_number)
        end
      end

      response(401, 'Unauthorized') do
        let(:Authorization) { nil }

        schema '$ref' => '#/components/schemas/Error'

        run_test!
      end
    end

    post('Create a comment') do
      description 'Create a new comment.'
      security [{ api_key: [] }]
      tags 'Comments'
      consumes 'application/json'
      produces 'application/json'

      parameter name: :comment, in: :body, schema: {
        type: :object,
        properties: {
          body: { type: :string, description: 'Content of the comment' },
          post_id: { type: :integer, description: 'ID of the post the comment belongs to' },
          parent_id: { type: :integer, nullable: true, description: 'ID of the parent comment if this is a comment reply' },
          is_post_update: { type: :boolean, nullable: true, description: 'Whether the comment is a post update or not' },
          impersonated_user_id: { type: :integer, nullable: true, description: 'ID of the user to impersonate (optional; requires admin role)' }
        },
        required: %w[body post_id]
      }

      response(201, 'successful') do
        let(:Authorization) { "Bearer #{@moderator_api_token}" }
        let(:comment) { { body: 'This is a comment', post_id: @post_1.id } }

        schema type: :object, properties: { id: { type: :integer } }

        before do
          @current_tenant = Current.tenant # Need to store the current tenant to use it later after request
          @comment_count_before = Comment.count
        end

        run_test! do |response|
          Current.tenant = @current_tenant # Restore the current tenant
          created_comment = Comment.find(JSON.parse(response.body)['id'])

          expect(Comment.count).to eq(@comment_count_before + 1)
          expect(created_comment.body).to eq(comment[:body])
          expect(created_comment.post_id).to eq(comment[:post_id])
        end
      end

      response(401, 'Unauthorized') do
        let(:Authorization) { nil }
        let(:comment) { { body: 'This is a comment', post_id: @post_1.id } }

        schema '$ref' => '#/components/schemas/Error'

        run_test!
      end

      response(422, 'Unprocessable entity') do
        let(:Authorization) { "Bearer #{@moderator_api_token}" }
        let(:comment) { { body: '', post_id: @post_1.id } }

        schema '$ref' => '#/components/schemas/Error'

        run_test!
      end

      # Impersonation works for admin users
      response(201, 'successful') do
        let(:Authorization) { "Bearer #{@admin_api_token}" }
        let(:comment) { { body: 'This is a comment', post_id: @post_1.id, impersonated_user_id: FactoryBot.create(:user).id } }

        schema type: :object, properties: { id: { type: :integer } }

        before do
          @current_tenant = Current.tenant # Need to store the current tenant to use it later after request
          @comment_count_before = Comment.count
        end

        run_test! do |response|
          Current.tenant = @current_tenant # Restore the current tenant
          created_comment = Comment.find(JSON.parse(response.body)['id'])

          expect(Comment.count).to eq(@comment_count_before + 1)
          expect(created_comment.body).to eq(comment[:body])
          expect(created_comment.post_id).to eq(comment[:post_id])
          expect(created_comment.user_id).to eq(comment[:impersonated_user_id])
        end
      end

      # Impersonation does not work for non-admin users
      response(401, 'Unauthorized') do
        let(:Authorization) { "Bearer #{@moderator_api_token}" }
        let(:comment) { { body: 'This is a comment', post_id: @post_1.id, impersonated_user_id: FactoryBot.create(:user).id } }

        schema '$ref' => '#/components/schemas/Error'

        run_test!
      end
    end
  end

  path '/api/v1/comments/{id}' do
    parameter name: :id, in: :path, type: :integer, required: true, description: 'ID of the comment.'

    get('Get a comment') do
      description 'Get a comment by id.'
      security [{ api_key: [] }]
      tags 'Comments'
      produces 'application/json'

      response(200, 'successful') do
        let(:Authorization) { "Bearer #{@moderator_api_token}" }
        let(:id) { @comment_1.id }

        schema '$ref' => '#/components/schemas/Comment'

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
        let(:id) { @comment_1.id }

        schema '$ref' => '#/components/schemas/Error'

        run_test!
      end

    end

    put('Update a comment') do
      description 'Update a comment by id.'
      security [{ api_key: [] }]
      tags 'Comments'
      consumes 'application/json'
      produces 'application/json'

      parameter name: :comment, in: :body, schema: {
        type: :object,
        properties: {
          body: { type: :string, description: 'Content of the comment' }
        },
        required: %w[body]
      }

      response(200, 'successful') do
        let(:Authorization) { "Bearer #{@moderator_api_token}" }
        let(:id) { @comment_1.id }
        let(:comment) { { body: 'Updated comment' } }

        schema type: :object, properties: { id: { type: :integer } }

        run_test! do |response|
          @comment_1.reload
          expect(@comment_1.body).to eq(comment[:body])
        end
      end

      response(404, 'Not found') do
        let(:Authorization) { "Bearer #{@moderator_api_token}" }
        let(:id) { 0 }
        let(:comment) { { body: 'Updated comment' } }

        schema '$ref' => '#/components/schemas/Error'

        run_test!
      end

      response(401, 'Unauthorized') do
        let(:Authorization) { nil }
        let(:id) { @comment_1.id }
        let(:comment) { { body: 'Updated comment' } }

        schema '$ref' => '#/components/schemas/Error'

        run_test!
      end

      response(422, 'Unprocessable entity') do
        let(:Authorization) { "Bearer #{@moderator_api_token}" }
        let(:id) { @comment_1.id }
        let(:comment) { { body: '' } }

        schema '$ref' => '#/components/schemas/Error'

        run_test!
      end
    end

    delete('Delete a comment') do
      description 'Delete a comment by id.'
      security [{ api_key: [] }]
      tags 'Comments'
      produces 'application/json'

      response(200, 'successful') do
        let(:Authorization) { "Bearer #{@moderator_api_token}" }
        let(:id) { @comment_1.id }

        schema type: :object, properties: { id: { type: :integer } }

        before do
          @current_tenant = Current.tenant # Need to store the current tenant to use it later after request
        end

        run_test! do |response|
          Current.tenant = @current_tenant # Restore the current tenant

          expect(Comment.find_by(id: @comment_1.id)).to be_nil
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
        let(:id) { @comment_1.id }

        schema '$ref' => '#/components/schemas/Error'

        run_test!
      end
    end      
  end

  path '/api/v1/comments/{id}/mark_as_post_update' do
    parameter name: :id, in: :path, type: :integer, required: true, description: 'ID of the comment.'

    put('Mark comment as post update') do
      description 'Mark a comment as a post update.<br><br><b>Note</b>: email notification to post followers will NOT be sent when using this endpoint. To send email notifications, use the "Create a comment" endpoint with the "is_post_update" parameter set to true.'
      security [{ api_key: [] }]
      tags 'Comments'
      produces 'application/json'

      response(200, 'successful') do
        let(:Authorization) { "Bearer #{@moderator_api_token}" }
        let(:id) { @comment_1.id }

        schema type: :object, properties: { id: { type: :integer } }

        before do
          @comment_1.update!(is_post_update: false)
        end

        run_test! do |response|
          @comment_1.reload
          expect(@comment_1.is_post_update).to eq(true)
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
        let(:id) { @comment_1.id }

        schema '$ref' => '#/components/schemas/Error'

        run_test!
      end
    end
  
  end

  path '/api/v1/comments/{id}/unmark_as_post_update' do
    parameter name: :id, in: :path, type: :integer, required: true, description: 'ID of the comment.'

    put('Unmark comment as post update') do
      description 'Unmark a comment as a post update.'
      security [{ api_key: [] }]
      tags 'Comments'
      produces 'application/json'

      response(200, 'successful') do
        let(:Authorization) { "Bearer #{@moderator_api_token}" }
        let(:id) { @comment_1.id }

        schema type: :object, properties: { id: { type: :integer } }

        before do
          @comment_1.update!(is_post_update: true)
        end

        run_test! do |response|
          @comment_1.reload
          expect(@comment_1.is_post_update).to eq(false)
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
        let(:id) { @comment_1.id }

        schema '$ref' => '#/components/schemas/Error'

        run_test!
      end
    end

  end
end