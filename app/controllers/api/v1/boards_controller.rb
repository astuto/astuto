module Api
  module V1
    class BoardsController < BaseController
      BOARD_JSON_ATTRIBUTES = [:id, :name, :slug, :description, :created_at, :updated_at].freeze

      # List all boards
      def index
        boards = Board.all

        authorize([:api, Board])

        render json: boards.map { |board| board.slice(*BOARD_JSON_ATTRIBUTES) }
      end
      
      # Get the board by id or slug
      def show
        board = Board.find_by(id: params[:id]) || Board.find_by(slug: params[:id])

        if board.nil?
          render json: { errors: ["Board with id '#{params[:id]}' not found"] }, status: :not_found
          return
        end

        authorize([:api, board])

        render json: board.slice(*BOARD_JSON_ATTRIBUTES)
      end
    end
  end
end