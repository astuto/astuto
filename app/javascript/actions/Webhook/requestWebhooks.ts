import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';

import { IWebhookJSON } from '../../interfaces/IWebhook';
import { State } from '../../reducers/rootReducer';

export const WEBHOOKS_REQUEST_START = 'WEBHOOKS_REQUEST_START';
interface WebhooksRequestStartAction {
  type: typeof WEBHOOKS_REQUEST_START;
}

export const WEBHOOKS_REQUEST_SUCCESS = 'WEBHOOKS_REQUEST_SUCCESS';
interface WebhooksRequestSuccessAction {
  type: typeof WEBHOOKS_REQUEST_SUCCESS;
  webhooks: Array<IWebhookJSON>;
}

export const WEBHOOKS_REQUEST_FAILURE = 'WEBHOOKS_REQUEST_FAILURE';
interface WebhooksRequestFailureAction {
  type: typeof WEBHOOKS_REQUEST_FAILURE;
  error: string;
}

export type WebhooksRequestActionTypes =
  WebhooksRequestStartAction |
  WebhooksRequestSuccessAction |
  WebhooksRequestFailureAction;


const webhooksRequestStart = (): WebhooksRequestActionTypes => ({
  type: WEBHOOKS_REQUEST_START,
});

const webhooksRequestSuccess = (
  webhooks: Array<IWebhookJSON>
): WebhooksRequestActionTypes => ({
  type: WEBHOOKS_REQUEST_SUCCESS,
  webhooks,
});

const webhooksRequestFailure = (error: string): WebhooksRequestActionTypes => ({
  type: WEBHOOKS_REQUEST_FAILURE,
  error,
});

export const requestWebhooks = (): ThunkAction<void, State, null, Action<string>> => (
  async (dispatch) => {
    dispatch(webhooksRequestStart());

    try {
      const response = await fetch('/webhooks');
      const json = await response.json();

      dispatch(webhooksRequestSuccess(json));
    } catch (e) {
      dispatch(webhooksRequestFailure(e));
    }
  }
)