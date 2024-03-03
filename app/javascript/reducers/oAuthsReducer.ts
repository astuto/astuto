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

import {
  OAuthDeleteActionTypes,
  OAUTH_DELETE_SUCCESS,
} from '../actions/OAuth/deleteOAuth';

import { IOAuth, oAuthJSON2JS } from '../interfaces/IOAuth';
import { DEFAULT_OAUTH_UPDATE_FAILURE, DEFAULT_OAUTH_UPDATE_START, DEFAULT_OAUTH_UPDATE_SUCCESS, DefaultOAuthUpdateActionTypes } from '../actions/OAuth/updateDefaultOAuth';

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
    OAuthUpdateActionTypes |
    OAuthDeleteActionTypes |
    DefaultOAuthUpdateActionTypes,
) => {
  switch (action.type) {
    case OAUTHS_REQUEST_START:
    case DEFAULT_OAUTH_UPDATE_START:
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
    case DEFAULT_OAUTH_UPDATE_FAILURE:
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
      };

    case DEFAULT_OAUTH_UPDATE_SUCCESS:
      return {
        ...state,
        areLoading: false,
        items: state.items.map(oAuth => {
          if (oAuth.id !== action.id) return oAuth;
          return {
            ...oAuth,
            defaultOAuthIsEnabled: action.isEnabled,
          };
        }),
      };

    case OAUTH_DELETE_SUCCESS:
      return {
        ...state,
        items: state.items.filter(oAuth => oAuth.id !== action.id),
      };

    default:
      return state;
  }
}

export default oAuthsReducer;