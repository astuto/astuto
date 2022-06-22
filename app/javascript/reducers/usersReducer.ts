import {
  UsersRequestActionTypes,
  USERS_REQUEST_START,
  USERS_REQUEST_SUCCESS,
  USERS_REQUEST_FAILURE,
} from '../actions/User/requestUsers';

import IUser from "../interfaces/IUser";

export interface UsersState {
  items: Array<IUser>;
  areLoading: boolean;
  error: string;
}

const initialState: UsersState = {
  items: [],
  areLoading: false,
  error: '',
};

const usersReducer = (
  state = initialState,
  action: UsersRequestActionTypes,
) => {
  switch (action.type) {
    case USERS_REQUEST_START:
      return {
        ...state,
        areLoading: true,
      };

    case USERS_REQUEST_SUCCESS:
      return {
        ...state,
        areLoading: false,
        error: '',
        items: action.users.map(userJson => ({
          id: userJson.id,
          email: userJson.email,
          fullName: userJson.full_name,
          role: userJson.role,
          status: userJson.status,
        })),
      };

    case USERS_REQUEST_FAILURE:
      return {
        ...state,
        areLoading: false,
        error: action.error,
      };
    
    default:
      return state;
  }
}

export default usersReducer;