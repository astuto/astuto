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

    src_index = params[:post_status][:src_index]
    dst_index = params[:post_status][:dst_index]
    where_range = src_index < dst_index ? src_index..dst_index : dst_index..src_index
    post_statuses = PostStatus.where(order: where_range)

    post_statuses.each do |post_status|
      if post_status.id == params[:post_status][:id]
        post_status.order = dst_index
      elsif src_index < dst_index
        post_status.order -= 1
      elsif src_index > dst_index
        post_status.order += 1
      end
    end

    PostStatus.transaction do
      begin
        post_statuses.each(&:save!)
      rescue
        render json: {
          error: I18n.t('errors.post_status.order', message: post_statuses.errors.full_messages)
        }, status: :unprocessable_entity

        return
      end
    end

    render json: 'ciao', status: :no_content
  end
end
