class BoardsController < ApplicationController

  before_action :check_subscription

  def show
    @board = Board.find(params[:id])
  end
end
