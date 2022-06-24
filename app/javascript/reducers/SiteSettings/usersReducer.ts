import {
  UsersRequestActionTypes,
  USERS_REQUEST_START,
  USERS_REQUEST_SUCCESS,
  USERS_REQUEST_FAILURE,
} from '../../actions/User/requestUsers';

import {
  UserUpdateActionTypes,
  USER_UPDATE_START,
  USER_UPDATE_SUCCESS,
  USER_UPDATE_FAILURE,
} from '../../actions/User/updateUser';

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
  action: UsersRequestActionTypes | UserUpdateActionTypes,
) => {
  switch (action.type) {
    case USERS_REQUEST_START:
    case USER_UPDATE_START:
      return {
        ...state,
        areUpdating: true,
      };

    case USERS_REQUEST_SUCCESS:
    case USER_UPDATE_SUCCESS:
      return {
        ...state,
        areUpdating: false,
        error: '',
      };

    case USERS_REQUEST_FAILURE:
    case USER_UPDATE_FAILURE:
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