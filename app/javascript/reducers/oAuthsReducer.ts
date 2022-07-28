import {
  OAuthsRequestActionTypes,
  OAUTHS_REQUEST_START,
  OAUTHS_REQUEST_SUCCESS,
  OAUTHS_REQUEST_FAILURE,
} from '../actions/OAuth/requestOAuths';

import {
  OAuthSubmitActionTypes,
  OAUTH_SUBMIT_SUCCESS,
} from '../actions/OAuth/submitOAuth';

import {
  OAuthUpdateActionTypes,
  OAUTH_UPDATE_SUCCESS,
} from '../actions/OAuth/updateOAuth';

import { IOAuth, oAuthJSON2JS } from '../interfaces/IOAuth';

export interface OAuthsState {
  items: Array<IOAuth>;
  areLoading: boolean;
  error: string;
}

const initialState: OAuthsState = {
  items: [],
  areLoading: false,
  error: '',
};

const oAuthsReducer = (
  state = initialState,
  action:
    OAuthsRequestActionTypes |
    OAuthSubmitActionTypes |
    OAuthUpdateActionTypes,
) => {
  switch (action.type) {
    case OAUTHS_REQUEST_START:
      return {
        ...state,
        areLoading: true,
      };

    case OAUTHS_REQUEST_SUCCESS:
      return {
        ...state,
        areLoading: false,
        error: '',
        items: action.oAuths.map<IOAuth>(oAuthJson => oAuthJSON2JS(oAuthJson)),
      };

    case OAUTHS_REQUEST_FAILURE:
      return {
        ...state,
        areLoading: false,
        error: action.error,
      };

    case OAUTH_SUBMIT_SUCCESS:
      return {
        ...state,
        items: [...state.items, oAuthJSON2JS(action.oAuth)],
      };

    case OAUTH_UPDATE_SUCCESS:
      return {
        ...state,
        items: state.items.map(oAuth => {
          if (oAuth.id !== parseInt(action.oAuth.id)) return oAuth;
          return oAuthJSON2JS(action.oAuth);
        })
      }

    default:
      return state;
  }
}

export default oAuthsReducer;