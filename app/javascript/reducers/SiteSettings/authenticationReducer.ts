import {
  OAuthSubmitActionTypes,
  OAUTH_SUBMIT_START,
  OAUTH_SUBMIT_SUCCESS,
  OAUTH_SUBMIT_FAILURE,
} from '../../actions/OAuth/submitOAuth';

import {
  OAuthUpdateActionTypes,
  OAUTH_UPDATE_START,
  OAUTH_UPDATE_SUCCESS,
  OAUTH_UPDATE_FAILURE,
} from '../../actions/OAuth/updateOAuth';

import {
  OAuthDeleteActionTypes,
  OAUTH_DELETE_START,
  OAUTH_DELETE_SUCCESS,
  OAUTH_DELETE_FAILURE,
} from '../../actions/OAuth/deleteOAuth';

export interface SiteSettingsAuthenticationState {
  isSubmitting: boolean;
  error: string;
}

const initialState: SiteSettingsAuthenticationState = {
  isSubmitting: false,
  error: '',
};

const siteSettingsAuthenticationReducer = (
  state = initialState,
  action:
    OAuthSubmitActionTypes |
    OAuthUpdateActionTypes |
    OAuthDeleteActionTypes,
) => {
  switch (action.type) {
    case OAUTH_SUBMIT_START:
    case OAUTH_UPDATE_START:
    case OAUTH_DELETE_START:
      return {
        ...state,
        isSubmitting: true,
      };

    case OAUTH_SUBMIT_SUCCESS:
    case OAUTH_UPDATE_SUCCESS:
    case OAUTH_DELETE_SUCCESS:
      return {
        ...state,
        isSubmitting: false,
        error: '',
      };

    case OAUTH_SUBMIT_FAILURE:
    case OAUTH_UPDATE_FAILURE:
    case OAUTH_DELETE_FAILURE:
      return {
        ...state,
        isSubmitting: false,
        error: action.error,
      };

    default:
      return state;
  }
}

export default siteSettingsAuthenticationReducer;