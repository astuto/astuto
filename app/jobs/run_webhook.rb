class RunWebhook < ActiveJob::Base
  queue_as :webhook

  def perform(webhook_id:, current_tenant_id:, is_test: false, entities: {})
    Current.tenant = Tenant.find(current_tenant_id)

    logger.info { "[#{Current.tenant.subdomain}] Performing RunWebhook ActiveJob for webhook ID #{webhook_id}" }

    # Find webhook from DB
    webhook = Webhook.find(webhook_id)

    # Skip if webhook is disabled and is not a test
    return if !is_test && !webhook.is_enabled

    print("\n\nentities: #{entities}\n\n")

    # Load entities from DB
    loaded_entities = {}
    entities.each do |entity_name, entity_id|
      entity_class = map_entity_name_to_class(entity_name)
      print("\n\n\n", entity_name, entity_id, entity_class)
      loaded_entities[entity_name] = entity_class.find(entity_id)
    end

    print("\n\nloaded_entities: #{loaded_entities}\n\n")

    # Build context based on webhook's trigger
    context = CreateLiquidTemplateContextWorkflow.new(
      webhook_trigger: webhook.trigger,
      is_test: is_test,
      entities: loaded_entities,
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

    def map_entity_name_to_class(entity_name)
      case entity_name
      when :post
        Post
      when :user, :post_author, :comment_author, :vote_author
        User
      when :board
        Board
      when :post_status
        PostStatus
      when :comment
        Comment
      else
        nil
      end
    end
end