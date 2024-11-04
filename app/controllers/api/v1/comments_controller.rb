module Api
  module V1
    class CommentsController < BaseController
      include Api::V1::Serializers
      include Api::V1::Helpers

      # List comments
      def index
        comments = Comment
          .includes(:user)
          .order(created_at: :desc)
          .limit(params[:limit] || 100)
          .offset(params[:offset] || 0)

        comments = comments.where(post_id: params[:post_id]) if params[:post_id].present?

        authorize([:api, Comment])

        render json: comments.as_json(only: COMMENT_JSON_ATTRIBUTES, include: {
          user: { only: USER_JSON_ATTRIBUTES }
        })
      end

      # Show a comment
      def show
        comment = Comment
          .includes(:user)
          .find_by(id: params[:id])

        unless comment
          raise ActiveRecord::RecordNotFound, "Comment with id #{params[:id]} not found"
        end

        authorize([:api, comment])

        render json: comment.as_json(only: COMMENT_JSON_ATTRIBUTES, include: {
          user: { only: USER_JSON_ATTRIBUTES }
        })
      end

      # Create a new comment
      def create
        comment = Comment.new(comment_params)

        authorize([:api, comment])

        comment.user_id = impersonate_user_if_requested(params[:impersonated_user_id], current_api_key.user_id)

        if comment.save
          render json: { id: comment.id }, status: :created
        else
          render json: { errors: comment.errors.full_messages }, status: :unprocessable_entity
        end
      end

      private

        def comment_params
          params.permit(:body, :is_post_update, :post_id, :parent_id)
        end
    end
  end
end