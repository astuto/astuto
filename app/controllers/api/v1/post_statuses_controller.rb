module Api
  module V1
    class PostStatusesController < BaseController
      POST_STATUS_JSON_ATTRIBUTES = [:id, :name, :color, :show_in_roadmap, :created_at, :updated_at].freeze

      # List all post statuses
      def index
        post_statuses = PostStatus.all

        authorize([:api, PostStatus])

        render json: post_statuses.map { |post_status| post_status.slice(*POST_STATUS_JSON_ATTRIBUTES) }
      end
    end
  end
end