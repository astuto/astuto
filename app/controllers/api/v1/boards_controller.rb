module Api
  module V1
    class BoardsController < BaseController
      include Api::V1::Serializers

      # List all boards
      def index
        boards = Board.all

        authorize([:api, Board])

        render json: boards.map { |board| board.slice(*BOARD_JSON_ATTRIBUTES) }
      end
      
      # Get the board by id or slug
      def show
        board = Board.find_by(id: params[:id]) || Board.find_by(slug: params[:id])

        unless board
          raise ActiveRecord::RecordNotFound, "Board with id #{params[:id]} not found"
        end

        authorize([:api, board])

        render json: board.slice(*BOARD_JSON_ATTRIBUTES)
      end

      # Create a new board
      def create
        board = Board.new(board_params)

        authorize([:api, board])

        if board.save
          render json: { id: board.id }, status: :created
        else
          render json: { errors: board.errors.full_messages }, status: :unprocessable_entity
        end
      end

      private

        def board_params
          params.require(:name)
          params.permit(:name, :slug, :description)
        end
    end
  end
end