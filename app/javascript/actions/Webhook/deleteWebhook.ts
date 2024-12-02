import { Action } from "redux";
import { ThunkAction } from "redux-thunk";
import HttpStatus from "../../constants/http_status";

import buildRequestHeaders from "../../helpers/buildRequestHeaders";
import { State } from "../../reducers/rootReducer";

export const WEBHOOK_DELETE_START = 'WEBHOOK_DELETE_START';
interface WebhookDeleteStartAction {
  type: typeof WEBHOOK_DELETE_START;
}

export const WEBHOOK_DELETE_SUCCESS = 'WEBHOOK_DELETE_SUCCESS';
interface WebhookDeleteSuccessAction {
  type: typeof WEBHOOK_DELETE_SUCCESS;
  id: number;
}

export const WEBHOOK_DELETE_FAILURE = 'WEBHOOK_DELETE_FAILURE';
interface WebhookDeleteFailureAction {
  type: typeof WEBHOOK_DELETE_FAILURE;
  error: string;
}

export type WebhookDeleteActionTypes =
  WebhookDeleteStartAction |
  WebhookDeleteSuccessAction |
  WebhookDeleteFailureAction;

const webhookDeleteStart = (): WebhookDeleteStartAction => ({
  type: WEBHOOK_DELETE_START,
});

const webhookDeleteSuccess = (
  id: number,
): WebhookDeleteSuccessAction => ({
  type: WEBHOOK_DELETE_SUCCESS,
  id,
});

const webhookDeleteFailure = (error: string): WebhookDeleteFailureAction => ({
  type: WEBHOOK_DELETE_FAILURE,
  error,
});

export const deleteWebhook = (
  id: number,
  authenticityToken: string,
): ThunkAction<void, State, null, Action<string>> => (
  async (dispatch) => {
    dispatch(webhookDeleteStart());

    try {
      const res = await fetch(`/webhooks/${id}`, {
        method: 'DELETE',
        headers: buildRequestHeaders(authenticityToken),
      });
      const json = await res.json();

      if (res.status === HttpStatus.Accepted) {
        dispatch(webhookDeleteSuccess(id));
      } else {
        dispatch(webhookDeleteFailure(json.error));
      }
    } catch (error) {
      dispatch(webhookDeleteFailure(error.message));
    }
  }
);