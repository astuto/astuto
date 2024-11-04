# frozen_string_literal: true

require 'rails_helper'

# Define reusable schemas
module Swagger
  module Schemas
    # Generic schema for returning an ID
    def self.Id
      {
        type: :object,
        properties: {
          id: { type: :integer, description: 'Unique ID' }
        },
        required: ['id']
      }
    end

    # Board schema
    def self.Board
      {
        type: :object,
        properties: {
          id: { type: :integer, description: 'Unique ID for the board' },
          name: { type: :string, description: 'Name of the board' },
          slug: { type: :string, description: 'Slug of the board' },
          description: { type: [:string, :null], description: 'Description of the board' },
          created_at: { type: :string, description: 'Date and time when the board was created' },
          updated_at: { type: :string, description: 'Date and time when the board was last updated' }
        },
        required: %w[id name slug description created_at updated_at]
      }
    end

    # Comment schema
    def self.Comment
      {
        type: :object,
        properties: {
          id: { type: :integer, description: 'Unique ID for the comment' },
          body: { type: :string, description: 'Content of the comment' },
          post_id: { type: :integer, description: 'ID of the post the comment belongs to' },
          is_post_update: { type: :boolean, description: 'Whether the comment is a post update or not' },
          user: { '$ref' => '#/components/schemas/User' },
          created_at: { type: :string, description: 'Date and time when the comment was created' },
          updated_at: { type: :string, description: 'Date and time when the comment was last updated' }
        },
        required: %w[id body is_post_update post_id user created_at updated_at]
      }
    end

    # PostStatus schema
    def self.PostStatus
      {
        type: :object,
        properties: {
          id: { type: :integer, description: 'Unique ID for the post status' },
          name: { type: :string, description: 'Name of the post status' },
          color: { type: :string, description: 'Color of the post status' },
          show_in_roadmap: { type: :boolean, description: 'Whether the post status should be shown in the roadmap or not' },
          created_at: { type: :string, description: 'Date and time when the post status was created' },
          updated_at: { type: :string, description: 'Date and time when the post status was last updated' }
        },
        required: %w[id name color show_in_roadmap created_at updated_at]
      }
    end

    # User schema
    def self.User
      {
        type: :object,
        properties: {
          id: { type: :integer, description: 'Unique ID for the user' },
          email: { type: :string, description: 'Email of the user' },
          full_name: { type: :string, description: 'Full name of the user' },
          created_at: { type: :string, description: 'Date and time when the user was created' },
          updated_at: { type: :string, description: 'Date and time when the user was last updated' }
        },
        required: %w[id email full_name created_at updated_at]
      }
    end

    # Post schema
    def self.Post
      {
        type: :object,
        properties: {
          id: { type: :integer, description: 'Unique ID for the post' },
          title: { type: :string, description: 'Title of the post' },
          description: { type: :string, description: 'Content of the post' },
          board: { '$ref' => '#/components/schemas/Board' },
          post_status: { '$ref' => '#/components/schemas/PostStatus' },
          user: { '$ref' => '#/components/schemas/User' },
          approval_status: { type: :string, description: 'Approval status of the post (approved, pending or rejected)' },
          slug: { type: :string, description: 'Slug of the post' },
          created_at: { type: :string, description: 'Date and time when the post was created' },
          updated_at: { type: :string, description: 'Date and time when the post was last updated' }
        },
        required: %w[id title description board post_status user approval_status slug created_at updated_at]
      }
    end
  end
end

RSpec.configure do |config|
  # Specify a root folder where Swagger JSON files are generated
  # NOTE: If you're using the rswag-api to serve API descriptions, you'll need
  # to ensure that it's configured to serve Swagger from the same folder
  config.openapi_root = Rails.root.join('swagger').to_s

  # Define one or more Swagger documents and provide global metadata for each one
  # When you run the 'rswag:specs:swaggerize' rake task, the complete Swagger will
  # be generated at the provided relative path under openapi_root
  # By default, the operations defined in spec files are added to the first
  # document below. You can override this behavior by adding a openapi_spec tag to the
  # the root example_group in your specs, e.g. describe '...', openapi_spec: 'v2/swagger.json'
  config.openapi_specs = {
    'v1/swagger.yaml' => {
      openapi: '3.0.1',
      info: {
        title: 'Astuto API',
        version: 'v1'
      },
      paths: {},
      servers: [
        {
          url: 'https://subdomain.astuto.io'
        }
      ],
      components: {
        schemas: {
          Id: Swagger::Schemas.Id,
          Board: Swagger::Schemas.Board,
          Comment: Swagger::Schemas.Comment,
          PostStatus: Swagger::Schemas.PostStatus,
          User: Swagger::Schemas.User,
          Post: Swagger::Schemas.Post,
          error: {
            type: :object,
            properties: {
              errors: { type: :array, items: { type: :string } }
            },
            required: ['errors']
          },
        },
        securitySchemes: {
          api_key: {
            type: :apiKey,
            name: 'Authorization',
            in: :header,
            description: 'Pass your API key in the `Authorization` header using format: `Bearer {your-api-key}`'
          }
        },
      }
    }
  }

  # Specify the format of the output Swagger file when running 'rswag:specs:swaggerize'.
  # The openapi_specs configuration option has the filename including format in
  # the key, this may want to be changed to avoid putting yaml in json files.
  # Defaults to json. Accepts ':json' and ':yaml'.
  config.openapi_format = :yaml
end
