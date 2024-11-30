class WebhooksController < ApplicationController
  def index
    authorize Webhook

    @webhooks = Webhook.order(trigger: :asc, created_at: :desc)

    render json: @webhooks
  end

  def create
    @webhook = Webhook.new
    @webhook.assign_attributes(webhook_params)
    authorize @webhook

    if @webhook.save
      render json: @webhook, status: :created
    else
      render json: {
        error: @webhook.errors.full_messages
      }, status: :unprocessable_entity
    end
  end

  def update
    @webhook = Webhook.find(params[:id])
    authorize @webhook

    if @webhook.update(webhook_params)
      render json: @webhook
    else
      render json: {
        error: @webhook.errors.full_messages
      }, status: :unprocessable_entity
    end
  end

  def destroy
    @webhook = Webhook.find(params[:id])
    authorize @webhook

    if @webhook.destroy
      render json: {
        id: params[:id]
      }, status: :accepted
    else
      render json: {
        error: @webhook.errors.full_messages
      }, status: :unprocessable_entity
    end
  end

  private

    def webhook_params
      params
        .require(:webhook)
        .permit(policy(@webhook).permitted_attributes)
    end
end