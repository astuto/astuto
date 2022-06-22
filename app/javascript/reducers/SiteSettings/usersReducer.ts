import {
  UsersRequestActionTypes,
  USERS_REQUEST_START,
  USERS_REQUEST_SUCCESS,
  USERS_REQUEST_FAILURE,
} from '../../actions/User/requestUsers';

export interface SiteSettingsUsersState {
  areUpdating: boolean;
  error: string;
}

const initialState: SiteSettingsUsersState = {
  areUpdating: false,
  error: '',
};

const siteSettingsUsersReducer = (
  state = initialState,
  action: UsersRequestActionTypes,
) => {
  switch (action.type) {
    case USERS_REQUEST_START:
      return {
        ...state,
        areUpdating: true,
      };

    case USERS_REQUEST_SUCCESS:
      return {
        ...state,
        areUpdating: false,
        error: '',
      };

    case USERS_REQUEST_FAILURE:
      return {
        ...state,
        areUpdating: false,
        error: action.error,
      };
    
    default:
      return state;
  }
}

export default siteSettingsUsersReducer;