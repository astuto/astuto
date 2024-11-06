module Api
  module V1
    module Serializers
      BOARD_JSON_ATTRIBUTES = [
        :id,
        :name,
        :slug,
        :description,
        :created_at,
        :updated_at
      ].freeze

      COMMENT_JSON_ATTRIBUTES = [
        :id,
        :body,
        :is_post_update,
        :post_id,
        :user,
        :created_at,
        :updated_at
      ].freeze

      POST_STATUS_JSON_ATTRIBUTES = [
        :id,
        :name,
        :color,
        :show_in_roadmap,
        :created_at,
        :updated_at
      ].freeze

      POST_JSON_ATTRIBUTES = [
        :id,
        :title,
        :description,
        :board,
        :post_status,
        :user,
        :approval_status,
        :slug,
        :created_at,
        :updated_at
      ].freeze

      USER_JSON_ATTRIBUTES = [
        :id,
        :email,
        :full_name,
        :created_at,
        :updated_at
      ].freeze

      LIKE_JSON_ATTRIBUTES = [
        :id,
        :user,
        :post_id,
        :created_at,
        :updated_at
      ].freeze
    end
  end
end