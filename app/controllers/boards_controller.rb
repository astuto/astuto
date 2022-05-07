class BoardsController < ApplicationController
  def index
    boards = Board.order(order: :asc)

    render json: boards
  end
  
  def show
    @board = Board.find(params[:id])
  end
end
