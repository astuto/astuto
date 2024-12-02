import {
  WebhooksRequestActionTypes,
  WEBHOOKS_REQUEST_START,
  WEBHOOKS_REQUEST_SUCCESS,
  WEBHOOKS_REQUEST_FAILURE,
} from '../actions/Webhook/requestWebhooks';

import {
  WebhookSubmitActionTypes,
  WEBHOOK_SUBMIT_SUCCESS,
} from '../actions/Webhook/submitWebhook';

import {
  WebhookUpdateActionTypes,
  WEBHOOK_UPDATE_SUCCESS,
} from '../actions/Webhook/updateWebhook';

import {
  WebhookDeleteActionTypes,
  WEBHOOK_DELETE_SUCCESS,
} from '../actions/Webhook/deleteWebhook';

import { IWebhook, webhookJSON2JS } from '../interfaces/IWebhook';

export interface WebhooksState {
  items: Array<IWebhook>;
  areLoading: boolean;
  error: string;
}

const initialState: WebhooksState = {
  items: [],
  areLoading: false,
  error: '',
};

const webhooksReducer = (
  state = initialState,
  action:
    WebhooksRequestActionTypes |
    WebhookSubmitActionTypes |
    WebhookUpdateActionTypes |
    WebhookDeleteActionTypes
) => {
  switch (action.type) {
    case WEBHOOKS_REQUEST_START:
      return {
        ...state,
        areLoading: true,
      };

    case WEBHOOKS_REQUEST_SUCCESS:
      return {
        ...state,
        areLoading: false,
        error: '',
        items: action.webhooks.map<IWebhook>(webhookJson => webhookJSON2JS(webhookJson)),
      };

    case WEBHOOKS_REQUEST_FAILURE:
      return {
        ...state,
        areLoading: false,
        error: action.error,
      };

    case WEBHOOK_SUBMIT_SUCCESS:
      return {
        ...state,
        items: [...state.items, webhookJSON2JS(action.webhook)],
      };

    case WEBHOOK_UPDATE_SUCCESS:
      return {
        ...state,
        items: state.items.map(webhook => {
          if (webhook.id !== parseInt(action.webhook.id)) return webhook;
          return webhookJSON2JS(action.webhook);
        }),
      }

    case WEBHOOK_DELETE_SUCCESS:
      return {
        ...state,
        items: state.items.filter(webhook => webhook.id !== action.id),
      };

    default:
      return state;
  }
};

export default webhooksReducer;