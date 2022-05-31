class PostStatusesController < ApplicationController
  include ApplicationHelper
  
  before_action :authenticate_admin, only: [:create, :update, :update_order, :destroy]

  def index
    post_statuses = PostStatus.order(order: :asc)

    render json: post_statuses
  end

  def create
    post_status = PostStatus.new(post_status_params)

    if post_status.save
      render json: post_status, status: :created
    else
      render json: {
        error: I18n.t('backend.errors.post_status.create', message: post_status.errors.full_messages)
      }, status: :unprocessable_entity
    end
  end

  def update
    post_status = PostStatus.find(params[:id])
    post_status.assign_attributes(post_status_params)

    if post_status.save
      render json: post_status, status: :ok
    else
      render json: {
        error: I18n.t('backend.errors.post_status.update', message: post_status.errors.full_messages)
      }, status: :unprocessable_entity
    end
  end

  def destroy
    post_status = PostStatus.find(params[:id])

    if post_status.destroy
      render json: {
        id: params[:id]
      }, status: :accepted
    else
      render json: {
        error: I18n.t('backend.errors.post_statuses.destroy', message: post_status.errors.full_messages)
      }, status: :unprocessable_entity
    end
  end

  def update_order
    workflow_output = ReorderWorkflow.new(
      entity_classname: PostStatus,
      column_name: 'order',
      entity_id: params[:post_status][:id],
      src_index: params[:post_status][:src_index],
      dst_index: params[:post_status][:dst_index]
    ).run

    if workflow_output
      render json: workflow_output
    else
      render json: {
        error: I18n.t("backend.errors.post_status.update_order")
      }, status: :unprocessable_entity
    end
  end

  private
    def post_status_params
      params
        .require(:post_status)
        .permit(:name, :color)
    end
end
