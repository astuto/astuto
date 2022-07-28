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
    OAuthUpdateActionTypes,
) => {
  switch (action.type) {
    case OAUTH_SUBMIT_START:
    case OAUTH_UPDATE_START:
      return {
        ...state,
        isSubmitting: true,
      };

    case OAUTH_SUBMIT_SUCCESS:
    case OAUTH_UPDATE_SUCCESS:
      return {
        ...state,
        isSubmitting: false,
        error: '',
      };

    case OAUTH_SUBMIT_FAILURE:
    case OAUTH_UPDATE_FAILURE:
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