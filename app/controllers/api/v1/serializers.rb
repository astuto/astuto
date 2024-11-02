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
    end
  end
end