class BoardsController < ApplicationController
  def show
    @board = Board.find(params[:id])
  end
end
