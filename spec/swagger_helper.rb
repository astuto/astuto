# frozen_string_literal: true

require 'rails_helper'
require_relative 'support/swagger_schemas'

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
          url: 'https://your-company.astuto.io'
        }
      ],
      tags: [
        {
          name: 'Boards',
          description: 'A Board is an entity that groups related Posts together.'
        },
        {
          name: 'Comments',
          description: 'A Comment can be written to reply to a Post or to another Comment. Moreover, administrators and moderators can mark a Comment as a "Post update": this is usually used to notify Users that some progress has been made in a Post.'
        },
        {
          name: 'Post Statuses',
          description: 'A Post Status is a label that can be assigned to a Post to indicate its current status (e.g. "In progress", "Completed", etc.).'
        },
        {
          name: 'Posts',
          description: 'A Post is a piece of content that can be created by Users. It usually represents ideas, suggestions, feedback or reports from your Users. Posts must be associated with a Board and can have Comments.'
        },
        {
          name: 'Users',
          description: 'A User is a person who interacts with the feedback space. Users can create and vote Posts, write Comments, and more.'
        },
        {
          name: 'Votes',
          description: 'A Vote is a way for Users to express their agreement/support for a Post.'
        }
      ],
      components: {
        # Schemas are defined in spec/support/swagger_schemas.rb
        schemas: {
          Error: Swagger::Schemas.Error,
          Id: Swagger::Schemas.Id,
          Board: Swagger::Schemas.Board,
          Comment: Swagger::Schemas.Comment,
          PostStatus: Swagger::Schemas.PostStatus,
          Post: Swagger::Schemas.Post,
          User: Swagger::Schemas.User,
          Vote: Swagger::Schemas.Vote
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
