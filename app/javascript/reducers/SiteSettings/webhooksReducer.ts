import {
  WebhookSubmitActionTypes,
  WEBHOOK_SUBMIT_START,
  WEBHOOK_SUBMIT_SUCCESS,
  WEBHOOK_SUBMIT_FAILURE,
} from '../../actions/Webhook/submitWebhook';

import {
  WebhookUpdateActionTypes,
  WEBHOOK_UPDATE_START,
  WEBHOOK_UPDATE_SUCCESS,
  WEBHOOK_UPDATE_FAILURE,
} from '../../actions/Webhook/updateWebhook';

import {
  WebhookDeleteActionTypes,
  WEBHOOK_DELETE_FAILURE,
  WEBHOOK_DELETE_START,
  WEBHOOK_DELETE_SUCCESS,
} from '../../actions/Webhook/deleteWebhook';

export interface SiteSettingsWebhooksState {
  isSubmitting: boolean;
  error: string;
}

const initialState: SiteSettingsWebhooksState = {
  isSubmitting: false,
  error: '',
};

const siteSettingsWebhooksReducer = (
  state = initialState,
  action:
    WebhookSubmitActionTypes |
    WebhookUpdateActionTypes |
    WebhookDeleteActionTypes
) => {
  switch (action.type) {
    case WEBHOOK_SUBMIT_START:
    case WEBHOOK_UPDATE_START:
    case WEBHOOK_DELETE_START:
      return {
        ...state,
        isSubmitting: true,
      };

    case WEBHOOK_SUBMIT_SUCCESS:
    case WEBHOOK_UPDATE_SUCCESS:
    case WEBHOOK_DELETE_SUCCESS:
      return {
        ...state,
        isSubmitting: false,
        error: '',
      };

    case WEBHOOK_SUBMIT_FAILURE:
    case WEBHOOK_UPDATE_FAILURE:
    case WEBHOOK_DELETE_FAILURE:
      return {
        ...state,
        isSubmitting: false,
        error: action.error,
      };

    default:
      return state;
  }
};

export default siteSettingsWebhooksReducer;