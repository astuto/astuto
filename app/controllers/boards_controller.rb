class BoardsController < ApplicationController
  def show
    @board = Board.find_by(slug: params[:id])
  end
end
