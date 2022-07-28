import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';

import { IOAuthJSON } from '../../interfaces/IOAuth';

import { State } from '../../reducers/rootReducer';

export const OAUTHS_REQUEST_START = 'OAUTHS_REQUEST_START';
interface OAuthsRequestStartAction {
  type: typeof OAUTHS_REQUEST_START;
}

export const OAUTHS_REQUEST_SUCCESS = 'OAUTHS_REQUEST_SUCCESS';
interface OAuthsRequestSuccessAction {
  type: typeof OAUTHS_REQUEST_SUCCESS;
  oAuths: Array<IOAuthJSON>;
}

export const OAUTHS_REQUEST_FAILURE = 'OAUTHS_REQUEST_FAILURE';
interface OAuthsRequestFailureAction {
  type: typeof OAUTHS_REQUEST_FAILURE;
  error: string;
}

export type OAuthsRequestActionTypes =
  OAuthsRequestStartAction |
  OAuthsRequestSuccessAction |
  OAuthsRequestFailureAction;


const oAuthsRequestStart = (): OAuthsRequestActionTypes => ({
  type: OAUTHS_REQUEST_START,
});

const oAuthsRequestSuccess = (
  oAuths: Array<IOAuthJSON>
): OAuthsRequestActionTypes => ({
  type: OAUTHS_REQUEST_SUCCESS,
  oAuths,
});

const oAuthsRequestFailure = (error: string): OAuthsRequestActionTypes => ({
  type: OAUTHS_REQUEST_FAILURE,
  error,
});

export const requestOAuths = (): ThunkAction<void, State, null, Action<string>> => (
  async (dispatch) => {
    dispatch(oAuthsRequestStart());

    try {
      const response = await fetch('/o_auths');
      const json = await response.json();

      dispatch(oAuthsRequestSuccess(json));
    } catch (e) {
      dispatch(oAuthsRequestFailure(e));
    }
  }
)