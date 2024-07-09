import {
  UserUpdateActionTypes,
  USER_UPDATE_START,
  USER_UPDATE_SUCCESS,
  USER_UPDATE_FAILURE,
} from '../actions/User/updateUser';

import moderationUsersReducer, { ModerationUsersState } from './Moderation/usersReducer';

interface ModerationState {
  users: ModerationUsersState;
}

const initialState: ModerationState = {
  users: moderationUsersReducer(undefined, {} as any),
};

const moderationReducer = (
  state = initialState,
  action:
    UserUpdateActionTypes
): ModerationState => {
  switch (action.type) {
    case USER_UPDATE_START:
    case USER_UPDATE_SUCCESS:
    case USER_UPDATE_FAILURE:
      return {
        ...state,
        users: moderationUsersReducer(state.users, action),
      };

    default:
      return state;
  }
}

export default moderationReducer;