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
        version: 'v1',
        description: 'The Astuto API allows you to interact programmatically with the feedback space. You can manage Boards, Posts, Comments, Users, Votes, and more.'
      },
      paths: {},
      servers: [
        {
          url: 'https://your-company.astuto.io'
        }
      ],
      tags: [
        {
          name: 'Get started',
          description: <<~DESC
            ### How to obtain an API key
            
            You can obtain an API key only if you are an administrator or moderator of the feedback space. To get an API key, follow these steps:

              1. Log in to the feedback space.
              2. Click on your name in the top right corner and then click on Profile settings.
              3. In the API key section, click on the Generate API key button.
              4. Copy the API key and store it in a safe place. It cannot be shown again. If you lose it, you will have to generate a new one.

            ### How to use the API key

            To use the API key, you need to pass it in the `Authorization` header of your requests. The header must be in the following format:

            `Bearer {your-api-key}`

            Note: all API endpoints require authentication, so you must pass the API key in all your requests.

            ### Moderator vs administrator API key

            Moderators and administrators can do almost the same operations through the API. Some notable differences are:
              
              - Only administrators can impersonate other users (see the following section).
              - Only administrators can create Boards.
              - Moderators cannot block administrators, whereas administrators can block moderators.

            ### The impersonation technique

            Administrators can impersonate other users through the API. This is useful if you want to submit a post or cast a vote on behalf of another user.

            Some endpoints accept an `impersonated_user_id` parameter. If you pass this parameter, the API will act as if the request was made by the user with the specified ID. For example, if you want to create a post on behalf of a user with ID 123, you can pass `impersonated_user_id=123` in the request body.

            Since you need to know the ID of the user you want to impersonate, this technique is usually used in combination with the Create/Get user endpoint. This endpoint creates a new user and returns its ID if it does not exist or it just returns the ID of the existing user. You can then use the returned ID to impersonate the user in other requests.

          DESC
        },
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
