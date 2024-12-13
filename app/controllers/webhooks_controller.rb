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

  def preview
    context = CreateLiquidTemplateContextWorkflow.new(
      webhook_trigger: params[:webhook][:trigger],
      is_test: true,
    ).run

    url_template = Liquid::Template.parse(params[:webhook][:url])
    url_preview = url_template.render(context)

    http_body_template = Liquid::Template.parse(params[:webhook][:http_body])
    http_body_preview = http_body_template.render(context)

    render json: {
      url_preview: url_preview,
      http_body_preview: http_body_preview,
    }, status: :ok
  rescue => e
    render json: {
      error: e.message
    }, status: :unprocessable_entity
  end

  def test
    response = RunWebhook.perform_now(params[:id], true)

    render json: {
      response: response,
    }, status: :ok
  rescue => e
    render json: {
      error: e.message
    }, status: :unprocessable_entity
  end

  private

    def webhook_params
      params
        .require(:webhook)
        .permit(policy(@webhook).permitted_attributes)
    end
end