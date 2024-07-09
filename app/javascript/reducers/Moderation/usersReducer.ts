import {
  UserUpdateActionTypes,
  USER_UPDATE_START,
  USER_UPDATE_SUCCESS,
  USER_UPDATE_FAILURE,
} from '../../actions/User/updateUser';

export interface ModerationUsersState {
  areUpdating: boolean;
  error: string;
}

const initialState: ModerationUsersState = {
  areUpdating: false,
  error: '',
};

const moderationUsersReducer = (
  state = initialState,
  action: UserUpdateActionTypes,
) => {
  switch (action.type) {
    case USER_UPDATE_START:
      return {
        ...state,
        areUpdating: true,
      };

    case USER_UPDATE_SUCCESS:
      return {
        ...state,
        areUpdating: false,
        error: '',
      };

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

export default moderationUsersReducer;