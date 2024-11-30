import { Action } from "redux";
import { ThunkAction } from "redux-thunk";

import { IWebhook, IWebhookJSON, webhookJS2JSON } from "../../interfaces/IWebhook";
import { State } from "react-joyride";
import buildRequestHeaders from "../../helpers/buildRequestHeaders";
import HttpStatus from "../../constants/http_status";

export const WEBHOOK_SUBMIT_START = 'WEBHOOK_SUBMIT_START';
interface WebhookSubmitStartAction {
  type: typeof WEBHOOK_SUBMIT_START;
}

export const WEBHOOK_SUBMIT_SUCCESS = 'WEBHOOK_SUBMIT_SUCCESS';
interface WebhookSubmitSuccessAction {
  type: typeof WEBHOOK_SUBMIT_SUCCESS;
  webhook: IWebhookJSON;
}

export const WEBHOOK_SUBMIT_FAILURE = 'WEBHOOK_SUBMIT_FAILURE';
interface WebhookSubmitFailureAction {
  type: typeof WEBHOOK_SUBMIT_FAILURE;
  error: string;
}

export type WebhookSubmitActionTypes =
  WebhookSubmitStartAction |
  WebhookSubmitSuccessAction |
  WebhookSubmitFailureAction;

const webhookSubmitStart = (): WebhookSubmitStartAction => ({
  type: WEBHOOK_SUBMIT_START,
});

const webhookSubmitSuccess = (
  webhookJSON: IWebhookJSON,
): WebhookSubmitSuccessAction => ({
  type: WEBHOOK_SUBMIT_SUCCESS,
  webhook: webhookJSON,
});

const webhookSubmitFailure = (error: string): WebhookSubmitFailureAction => ({
  type: WEBHOOK_SUBMIT_FAILURE,
  error,
});

export const submitWebhook = (
  webhook: IWebhook,
  authenticityToken: string,
): ThunkAction<void, State, null, Action<string>> => async (dispatch) => {
  dispatch(webhookSubmitStart());

  try {
    const res = await fetch(`/webhooks`, {
      method: 'POST',
      headers: buildRequestHeaders(authenticityToken),
      body: JSON.stringify({
        webhook: {
          ...webhookJS2JSON(webhook),
          is_enabled: false,
        },
      }),
    });
    const json = await res.json();

    if (res.status === HttpStatus.Created) {
      dispatch(webhookSubmitSuccess(json));
    } else {
      dispatch(webhookSubmitFailure(json.error));
    }

    return Promise.resolve(res);
  } catch (e) {
    dispatch(webhookSubmitFailure(e));

    return Promise.resolve(null);
  }
};