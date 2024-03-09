import { Action } from "redux";
import { ThunkAction } from "redux-thunk";

import { IOAuthJSON } from "../../interfaces/IOAuth";
import { State } from "../../reducers/rootReducer";
import buildRequestHeaders from "../../helpers/buildRequestHeaders";
import HttpStatus from "../../constants/http_status";

export const DEFAULT_OAUTH_UPDATE_START = 'DEFAULT_OAUTH_UPDATE_START';
interface DefaultOAuthUpdateStartAction {
  type: typeof DEFAULT_OAUTH_UPDATE_START;
}

export const DEFAULT_OAUTH_UPDATE_SUCCESS = 'DEFAULT_OAUTH_UPDATE_SUCCESS';
interface DefaultOAuthUpdateSuccessAction {
  type: typeof DEFAULT_OAUTH_UPDATE_SUCCESS;
  id: number;
  isEnabled: boolean;
}

export const DEFAULT_OAUTH_UPDATE_FAILURE = 'DEFAULT_OAUTH_UPDATE_FAILURE';
interface DefaultOAuthUpdateFailureAction {
  type: typeof DEFAULT_OAUTH_UPDATE_FAILURE;
  error: string;
}

export type DefaultOAuthUpdateActionTypes =
  DefaultOAuthUpdateStartAction |
  DefaultOAuthUpdateSuccessAction |
  DefaultOAuthUpdateFailureAction;

const defaultOAuthUpdateStart = (): DefaultOAuthUpdateStartAction => ({
  type: DEFAULT_OAUTH_UPDATE_START,
});

const defaultOAuthUpdateSuccess = (
  id: number,
  isEnabled: boolean,
): DefaultOAuthUpdateSuccessAction => ({
  type: DEFAULT_OAUTH_UPDATE_SUCCESS,
  id,
  isEnabled,
});

const defaultOAuthUpdateFailure = (error: string): DefaultOAuthUpdateFailureAction => ({
  type: DEFAULT_OAUTH_UPDATE_FAILURE,
  error,
});

interface UpdateDefaultOAuthParams {
  id: number;
  isEnabled?: boolean;
  authenticityToken: string;
}

export const updateDefaultOAuth = ({
  id,
  isEnabled = null,
  authenticityToken,
}: UpdateDefaultOAuthParams): ThunkAction<void, State, null, Action<string>> => async (dispatch) => {
  try {
    dispatch(defaultOAuthUpdateStart());

    const res = await fetch(`/o_auths/${id}/tenant_default_o_auths`, {
      method: isEnabled ? 'POST' : 'DELETE',
      headers: buildRequestHeaders(authenticityToken),
    });
    await res.json();

    if (res.status === HttpStatus.Created || res.status === HttpStatus.Accepted)
      dispatch(defaultOAuthUpdateSuccess(id, isEnabled));
  } catch (e) {
    console.log('An error occurred while enabling/disabling default OAuth');
  }
};