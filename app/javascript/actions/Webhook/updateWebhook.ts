import { Action } from "redux";
import { ThunkAction } from "redux-thunk";

import HttpStatus from "../../constants/http_status";
import buildRequestHeaders from "../../helpers/buildRequestHeaders";
import { State } from "../../reducers/rootReducer";
import { IWebhookJSON } from "../../interfaces/IWebhook";
import { ISiteSettingsWebhookFormUpdate } from "../../components/SiteSettings/Webhooks/WebhookForm";

export const WEBHOOK_UPDATE_START = 'WEBHOOK_UPDATE_START';
interface WebhookUpdateStartAction {
  type: typeof WEBHOOK_UPDATE_START;
}

export const WEBHOOK_UPDATE_SUCCESS = 'WEBHOOK_UPDATE_SUCCESS';
interface WebhookUpdateSuccessAction {
  type: typeof WEBHOOK_UPDATE_SUCCESS;
  webhook: IWebhookJSON;
}

export const WEBHOOK_UPDATE_FAILURE = 'WEBHOOK_UPDATE_FAILURE';
interface WebhookUpdateFailureAction {
  type: typeof WEBHOOK_UPDATE_FAILURE;
  error: string;
}

export type WebhookUpdateActionTypes =
  WebhookUpdateStartAction |
  WebhookUpdateSuccessAction |
  WebhookUpdateFailureAction;

const webhookUpdateStart = (): WebhookUpdateStartAction => ({
  type: WEBHOOK_UPDATE_START,
});

const webhookUpdateSuccess = (
  webhookJSON: IWebhookJSON,
): WebhookUpdateSuccessAction => ({
  type: WEBHOOK_UPDATE_SUCCESS,
  webhook: webhookJSON,
});

const webhookUpdateFailure = (error: string): WebhookUpdateFailureAction => ({
  type: WEBHOOK_UPDATE_FAILURE,
  error,
});

interface UpdateWebhookParams {
  id: number;
  form?: ISiteSettingsWebhookFormUpdate;
  isEnabled?: boolean;
  authenticityToken: string;
}

export const updateWebhook = ({
  id,
  form = null,
  isEnabled = null,
  authenticityToken,
}: UpdateWebhookParams): ThunkAction<void, State, null, Action<string>> => async (dispatch) => {
  dispatch(webhookUpdateStart());

  const webhook = Object.assign({},
    form !== null ? {
      name: form.name,
      description: form.description,
      trigger: form.trigger,
      http_method: form.httpMethod,
      url: form.url,
      http_body: form.httpBody,
      http_headers: form.httpHeaders,
    } : null,
    isEnabled !== null ? { is_enabled: isEnabled } : null,
  );

  try {
    const res = await fetch(`/webhooks/${id}`, {
      method: 'PATCH',
      headers: buildRequestHeaders(authenticityToken),
      body: JSON.stringify({ webhook }),
    });
    const json = await res.json();

    if (res.status === HttpStatus.OK) {
      dispatch(webhookUpdateSuccess(json));
    } else {
      dispatch(webhookUpdateFailure(json.error));
    }

    return Promise.resolve(res);
  } catch (e) {
    dispatch(webhookUpdateFailure(e));

    return Promise.resolve(null);
  }
};