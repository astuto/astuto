import {
  WebhookSubmitActionTypes,
  WEBHOOK_SUBMIT_START,
  WEBHOOK_SUBMIT_SUCCESS,
  WEBHOOK_SUBMIT_FAILURE,
} from '../../actions/Webhook/submitWebhook';

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
  action: WebhookSubmitActionTypes,
) => {
  switch (action.type) {
    case WEBHOOK_SUBMIT_START:
      return {
        ...state,
        isSubmitting: true,
      };

    case WEBHOOK_SUBMIT_SUCCESS:
      return {
        ...state,
        isSubmitting: false,
        error: '',
      };

    case WEBHOOK_SUBMIT_FAILURE:
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