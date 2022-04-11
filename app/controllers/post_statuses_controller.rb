class PostStatusesController < ApplicationController
  before_action :authenticate_user!, only: [:update_order]

  def index
    post_statuses = PostStatus.order(order: :asc)

    render json: post_statuses
  end

  def update_order
    if not current_user.admin?
      render json: I18n.t('errors.unauthorized'), status: :unauthorized
      return
    end

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
        error: I18n.t("errors.post_status.update_order")
      }, status: :unprocessable_entity
    end
  end
end
