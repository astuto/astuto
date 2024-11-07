module Api
  module V1
    class UsersController < BaseController
      include Api::V1::Serializers
      include Api::V1::Helpers

      # List users
      def index
        users = User
          .order(created_at: :desc)
          .limit(params[:limit] || 100)
          .offset(params[:offset] || 0)

        authorize([:api, User])

        render json: users.as_json(only: USER_JSON_ATTRIBUTES)
      end

      # Get user by id
      def show
        user = User.find_by(id: params[:id])

        unless user
          raise ActiveRecord::RecordNotFound, "User with id #{params[:id]} not found"
        end

        authorize([:api, user])

        render json: user.slice(*USER_JSON_ATTRIBUTES)
      end

      # Get user by email
      def show_by_email
        user = User.find_by(email: params[:email])

        unless user
          raise ActiveRecord::RecordNotFound, "User with email #{params[:email]} not found"
        end

        authorize([:api, user])

        render json: user.slice(*USER_JSON_ATTRIBUTES)
      end

      # Create user
      def create
        user = User.new(
          email: params[:email],
          full_name: params[:full_name],
          password: Devise.friendly_token,
          has_set_password: false,
          status: 'active'
        )
        user.skip_confirmation

        authorize([:api, user])

        if user.save
          render json: { id: user.id }, status: :created
        else
          render json: { errors: user.errors.full_messages }, status: :unprocessable_entity
        end
      end

      # Block user
      def block
        user = User.find_by(id: params[:id])

        unless user
          raise ActiveRecord::RecordNotFound, "User with id #{params[:id]} not found"
        end

        authorize([:api, user])

        user.update!(status: 'blocked')

        render json: { id: user.id }, status: :ok
      end

    end
  end
end