import {
  OAuthSubmitActionTypes,
  OAUTH_SUBMIT_START,
  OAUTH_SUBMIT_SUCCESS,
  OAUTH_SUBMIT_FAILURE,
} from '../../actions/OAuth/submitOAuth';

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
  action: OAuthSubmitActionTypes,
) => {
  switch (action.type) {
    case OAUTH_SUBMIT_START:
      return {
        ...state,
        isSubmitting: true,
      };

    case OAUTH_SUBMIT_SUCCESS:
      return {
        ...state,
        isSubmitting: false,
        error: '',
      };

    case OAUTH_SUBMIT_FAILURE:
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