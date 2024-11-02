module Api
  module V1
    class PostsController < BaseController
      include Api::V1::Serializers

      # List posts
      def index
        posts = Post
          .includes(:board, :post_status, :user)
          .order(created_at: :desc)
          .limit(params[:limit] || 20)
          .offset(params[:offset] || 0)

        posts = posts.where(board_id: params[:board_id]) if params[:board_id].present?
        posts = posts.where(user_id: params[:user_id]) if params[:user_id].present?

        authorize([:api, Post])

        render json: posts.as_json(only: POST_JSON_ATTRIBUTES, include: {
          board: { only: BOARD_JSON_ATTRIBUTES },
          post_status: { only: POST_STATUS_JSON_ATTRIBUTES },
          user: { only: USER_JSON_ATTRIBUTES }
        })
      end

      # Get a post by id
      def show
        post = Post
          .includes(:board, :post_status, :user)
          .find_by(id: params[:id])

        unless post
          raise ActiveRecord::RecordNotFound, "Post with id #{params[:id]} not found"
        end

        authorize([:api, post])

        render json: post.as_json(only: POST_JSON_ATTRIBUTES, include: {
          board: { only: BOARD_JSON_ATTRIBUTES },
          post_status: { only: POST_STATUS_JSON_ATTRIBUTES },
          user: { only: USER_JSON_ATTRIBUTES }
        })
      end

      # Update a post
      def update
        post = Post.find_by(id: params[:id])

        unless post
          raise ActiveRecord::RecordNotFound, "Post with id #{params[:id]} not found"
        end

        authorize([:api, post])

        post.update!(post_update_params)

        render json: { id: post.id }, status: :ok
      end

      # Delete a post
      def destroy
        post = Post.find_by(id: params[:id])

        unless post
          raise ActiveRecord::RecordNotFound, "Post with id #{params[:id]} not found"
        end

        authorize([:api, post])

        post.destroy!

        render json: { id: post.id }, status: :ok
      end

      # Update post board
      def update_board
        post = Post.find_by(id: params[:id])

        unless post
          raise ActiveRecord::RecordNotFound, "Post with id #{params[:id]} not found"
        end

        authorize([:api, post])

        post.update!(post_update_board_params)

        render json: { id: post.id }, status: :ok
      end

      # Update post status
      def update_status
        post = Post.find_by(id: params[:id])

        unless post
          raise ActiveRecord::RecordNotFound, "Post with id #{params[:id]} not found"
        end

        authorize([:api, post])

        post.update!(post_update_status_params)

        if post.post_status_id_previously_changed?
          ExecutePostStatusChangeLogicWorkflow.new(
            user_id: current_api_key.user_id,
            post: post,
            post_status_id: post.post_status_id
          ).run
        end

        render json: { id: post.id }, status: :ok
      end

      private

      def post_update_params
        params.permit(:title, :description)
      end

      def post_update_board_params
        params.require(:board_id)
        params.permit(:board_id)
      end

      def post_update_status_params
        params.permit(:post_status_id)
      end
    end
  end
end