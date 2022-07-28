import { Action } from "redux";
import { ThunkAction } from "redux-thunk";

import HttpStatus from "../../constants/http_status";
import buildRequestHeaders from "../../helpers/buildRequestHeaders";
import IOAuth from "../../interfaces/IOAuth";
import IOAuthJSON from "../../interfaces/json/IOAuth";
import { State } from "../../reducers/rootReducer";

export const OAUTH_SUBMIT_START = 'OAUTH_SUBMIT_START';
interface OAuthSubmitStartAction {
  type: typeof OAUTH_SUBMIT_START;
}

export const OAUTH_SUBMIT_SUCCESS = 'OAUTH_SUBMIT_SUCCESS';
interface OAuthSubmitSuccessAction {
  type: typeof OAUTH_SUBMIT_SUCCESS;
  oAuth: IOAuthJSON;
}

export const OAUTH_SUBMIT_FAILURE = 'OAUTH_SUBMIT_FAILURE';
interface OAuthSubmitFailureAction {
  type: typeof OAUTH_SUBMIT_FAILURE;
  error: string;
}

export type OAuthSubmitActionTypes =
  OAuthSubmitStartAction |
  OAuthSubmitSuccessAction |
  OAuthSubmitFailureAction;

const oAuthSubmitStart = (): OAuthSubmitStartAction => ({
  type: OAUTH_SUBMIT_START,
});

const oAuthSubmitSuccess = (
  oAuthJSON: IOAuthJSON,
): OAuthSubmitSuccessAction => ({
  type: OAUTH_SUBMIT_SUCCESS,
  oAuth: oAuthJSON,
});

const oAuthSubmitFailure = (error: string): OAuthSubmitFailureAction => ({
  type: OAUTH_SUBMIT_FAILURE,
  error,
});

export const submitOAuth = (
  oAuth: IOAuth,
  authenticityToken: string,
): ThunkAction<void, State, null, Action<string>> => async (dispatch) => {
  dispatch(oAuthSubmitStart());

  try {
    const res = await fetch(`/o_auths`, {
      method: 'POST',
      headers: buildRequestHeaders(authenticityToken),
      body: JSON.stringify({
        o_auth: {
          name: oAuth.name,
          logo: oAuth.logo,
          is_enabled: false,
          client_id: oAuth.clientId,
          client_secret: oAuth.clientSecret,
          authorize_url: oAuth.authorizeUrl,
          token_url: oAuth.tokenUrl,
          profile_url: oAuth.profileUrl,
          scope: oAuth.scope,
          json_user_email_path: oAuth.jsonUserEmailPath,
          json_user_name_path: oAuth.jsonUserNamePath,
        },
      }),
    });
    const json = await res.json();

    if (res.status === HttpStatus.Created) {
      dispatch(oAuthSubmitSuccess(json));
    } else {
      dispatch(oAuthSubmitFailure(json.error));
    }

    return Promise.resolve(res);
  } catch (e) {
    dispatch(oAuthSubmitFailure(e));

    return Promise.resolve(null);
  }
};