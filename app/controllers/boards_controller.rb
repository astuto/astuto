class BoardsController < ApplicationController
  include ApplicationHelper
  
  before_action :authenticate_admin, only: [:create, :update_order, :destroy]

  def index
    boards = Board.order(order: :asc)

    render json: boards
  end

  def create
    board = Board.new(board_params)

    if board.save
      render json: board, status: :created
    else
      render json: {
        error: I18n.t('errors.board.create', message: board.errors.full_messages)
      }, status: :unprocessable_entity
    end
  end

  def update_order
    workflow_output = ReorderWorkflow.new(
      entity_classname: Board,
      column_name: 'order',
      entity_id: params[:board][:id],
      src_index: params[:board][:src_index],
      dst_index: params[:board][:dst_index]
    ).run

    if workflow_output
      render json: workflow_output
    else
      render json: {
        error: I18n.t("errors.board.update_order")
      }, status: :unprocessable_entity
    end
  end

  def destroy
    board = Board.find(params[:id])

    if board.destroy
      render json: {
        id: params[:id]
      }, status: :accepted
    else
      render json: {
        error: I18n.t('errors.board.destroy', message: board.errors.full_messages)
      }, status: :unprocessable_entity
    end
  end
  
  def show
    @board = Board.find(params[:id])
  end

  private
    def board_params
      params
        .require(:board)
        .permit(:name, :description)
    end
end
