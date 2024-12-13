class RunWebhook < ActiveJob::Base
  queue_as :webhook

  def perform(webhook_id, is_test = false)
    logger.info { "Performing RunWebhook ActiveJob" }

    # Find webhook from DB
    webhook = Webhook.find(webhook_id)

    # Build context based on webhook's trigger
    context = CreateLiquidTemplateContextWorkflow.new(
      webhook_trigger: webhook.trigger,
      is_test: is_test,
    ).run

    # Parse and render template for webhook's URL
    url_template = Liquid::Template.parse(webhook.url)
    url = url_template.render(context)

    # Parse and render template for webhook's HTTP body
    http_body_template = Liquid::Template.parse(webhook.http_body)
    http_body = http_body_template.render(context)

    # Prepare HTTP body
    if webhook.http_body.present?
      http_body = JSON.parse(http_body).to_json
    else
      http_body = nil
    end

    # Prepare HTTP headers
    if webhook.http_headers.present?
      http_headers = JSON.parse(webhook.http_headers).each_with_object({}) do |header, memo|
        memo[header['key']] = header['value']
      end
    else
      http_headers = {}
    end

    # Make HTTP request
    HTTParty.send(
      map_webhook_http_method(webhook.http_method).downcase,
      url,
      {
        body: http_body,
        headers: http_headers,
      }
    )
  end

  private

    def map_webhook_http_method(http_method)
      case http_method
      when :http_post
        'POST'
      when :http_put
        'PUT'
      when :http_patch
        'PATCH'
      when :http_delete
        'DELETE'
      else
        'POST'
      end
    end
end