// Trigger
export const WEBHOOK_TRIGGER_NEW_POST = 'new_post';
export const WEBHOOK_TRIGGER_NEW_POST_PENDING_APPROVAL = 'new_post_pending_approval';
export const WEBHOOK_TRIGGER_DELETED_POST = 'deleted_post';
export const WEBHOOK_TRIGGER_POST_STATUS_CHANGE = 'post_status_change';
export const WEBHOOK_TRIGGER_NEW_COMMENT = 'new_comment';
export const WEBHOOK_TRIGGER_NEW_VOTE = 'new_vote';
export const WEBHOOK_TRIGGER_NEW_USER = 'new_user';

export type WebhookTrigger =
  typeof WEBHOOK_TRIGGER_NEW_POST |
  typeof WEBHOOK_TRIGGER_NEW_POST_PENDING_APPROVAL |
  typeof WEBHOOK_TRIGGER_DELETED_POST |
  typeof WEBHOOK_TRIGGER_POST_STATUS_CHANGE |
  typeof WEBHOOK_TRIGGER_NEW_COMMENT |
  typeof WEBHOOK_TRIGGER_NEW_VOTE |
  typeof WEBHOOK_TRIGGER_NEW_USER;

// HTTP method
export const WEBHOOK_HTTP_METHOD_POST = 'http_post';
export const WEBHOOK_HTTP_METHOD_PUT = 'http_put';
export const WEBHOOK_HTTP_METHOD_PATCH = 'http_patch';
export const WEBHOOK_HTTP_METHOD_DELETE = 'http_delete';

export type WebhookHttpMethod =
  typeof WEBHOOK_HTTP_METHOD_POST |
  typeof WEBHOOK_HTTP_METHOD_PUT |
  typeof WEBHOOK_HTTP_METHOD_PATCH |
  typeof WEBHOOK_HTTP_METHOD_DELETE;

export interface IWebhook {
  id?: number;
  name: string;
  description?: string;
  isEnabled: boolean;
  trigger: WebhookTrigger;
  url: string;
  httpBody: string;
  httpMethod: WebhookHttpMethod;
  httpHeaders: string;
}

export interface IWebhookJSON {
  id: string;
  name: string;
  description?: string;
  is_enabled: boolean;
  trigger: WebhookTrigger;
  url: string;
  http_body: string;
  http_method: WebhookHttpMethod;
  http_headers: string;
}

export const webhookJSON2JS = (webhookJSON: IWebhookJSON): IWebhook => ({
  id: parseInt(webhookJSON.id),
  name: webhookJSON.name,
  description: webhookJSON.description,
  isEnabled: webhookJSON.is_enabled,
  trigger: webhookJSON.trigger,
  url: webhookJSON.url,
  httpBody: webhookJSON.http_body,
  httpMethod: webhookJSON.http_method,
  httpHeaders: webhookJSON.http_headers,
});

export const webhookJS2JSON = (webhook: IWebhook) => ({
  id: webhook.id?.toString(),
  name: webhook.name,
  description: webhook.description,
  is_enabled: webhook.isEnabled,
  trigger: webhook.trigger,
  url: webhook.url,
  http_body: webhook.httpBody,
  http_method: webhook.httpMethod,
  http_headers: webhook.httpHeaders,
});