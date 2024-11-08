module Api
  module V1
    class LikesController < BaseController
      include Api::V1::Serializers
      include Api::V1::Helpers

      # List likes
      def index
        likes = Like
          .includes(:user)
          .order(created_at: :desc)
          .limit(params[:limit] || 100)
          .offset(params[:offset] || 0)

        likes = likes.where(post_id: params[:post_id]) if params[:post_id].present?

        authorize([:api, Like])

        render json: likes.as_json(only: LIKE_JSON_ATTRIBUTES, include: {
          user: { only: USER_JSON_ATTRIBUTES }
        })
      end

      # Show a like
      def show
        like = Like
          .includes(:user)
          .find_by(id: params[:id])

        unless like
          raise ActiveRecord::RecordNotFound, "Like with id #{params[:id]} not found"
        end

        authorize([:api, like])

        render json: like.as_json(only: LIKE_JSON_ATTRIBUTES, include: {
          user: { only: USER_JSON_ATTRIBUTES }
        })
      end

      # Create like
      def create
        like = Like.new(like_params)

        authorize([:api, like])

        like.user_id = impersonate_user_if_requested(params[:impersonated_user_id], current_api_key.user_id)

        if like.save
          render json: { id: like.id }, status: :created
        else
          render json: { errors: like.errors.full_messages }, status: :unprocessable_entity
        end
      end

      # Delete like
      def destroy
        like = Like.find_by(id: params[:id])

        unless like
          raise ActiveRecord::RecordNotFound, "Like with id #{params[:id]} not found"
        end

        authorize([:api, like])

        like.destroy!

        render json: { id: like.id }, status: :ok
      end

      private

        def like_params
          params.permit(:post_id)
        end

    end
  end
end