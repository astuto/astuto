import { Action } from "redux";
import { ThunkAction } from "redux-thunk";
import HttpStatus from "../../constants/http_status";

import buildRequestHeaders from "../../helpers/buildRequestHeaders";
import { State } from "../../reducers/rootReducer";

export const OAUTH_DELETE_START = 'OAUTH_DELETE_START';
interface OAuthDeleteStartAction {
  type: typeof OAUTH_DELETE_START;
}

export const OAUTH_DELETE_SUCCESS = 'OAUTH_DELETE_SUCCESS';
interface OAuthDeleteSuccessAction {
  type: typeof OAUTH_DELETE_SUCCESS;
  id: number;
}

export const OAUTH_DELETE_FAILURE = 'OAUTH_DELETE_FAILURE';
interface OAuthDeleteFailureAction {
  type: typeof OAUTH_DELETE_FAILURE;
  error: string;
}

export type OAuthDeleteActionTypes =
  OAuthDeleteStartAction |
  OAuthDeleteSuccessAction |
  OAuthDeleteFailureAction;

const oAuthDeleteStart = (): OAuthDeleteStartAction => ({
  type: OAUTH_DELETE_START,
});

const oAuthDeleteSuccess = (
  id: number,
): OAuthDeleteSuccessAction => ({
  type: OAUTH_DELETE_SUCCESS,
  id,
});

const oAuthDeleteFailure = (error: string): OAuthDeleteFailureAction => ({
  type: OAUTH_DELETE_FAILURE,
  error,
});

export const deleteOAuth = (
  id: number,
  authenticityToken: string,
): ThunkAction<void, State, null, Action<string>> => (
  async (dispatch) => {
    dispatch(oAuthDeleteStart());

    try {
      const res = await fetch(`/o_auths/${id}`, {
        method: 'DELETE',
        headers: buildRequestHeaders(authenticityToken),
      });
      const json = await res.json();

      if (res.status === HttpStatus.Accepted) {
        dispatch(oAuthDeleteSuccess(id));
      } else {
        dispatch(oAuthDeleteFailure(json.error));
      }
    } catch (e) {
      dispatch(oAuthDeleteFailure(e));
    }
  }
);