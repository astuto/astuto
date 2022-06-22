import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';

import IUserJSON from '../../interfaces/json/IUser';

import { State } from '../../reducers/rootReducer';

export const USERS_REQUEST_START = 'USERS_REQUEST_START';
interface UsersRequestStartAction {
  type: typeof USERS_REQUEST_START;
}

export const USERS_REQUEST_SUCCESS = 'USERS_REQUEST_SUCCESS';
interface UsersRequestSuccessAction {
  type: typeof USERS_REQUEST_SUCCESS;
  users: Array<IUserJSON>;
}

export const USERS_REQUEST_FAILURE = 'USERS_REQUEST_FAILURE';
interface UsersRequestFailureAction {
  type: typeof USERS_REQUEST_FAILURE;
  error: string;
}

export type UsersRequestActionTypes =
  UsersRequestStartAction |
  UsersRequestSuccessAction |
  UsersRequestFailureAction;


const usersRequestStart = (): UsersRequestActionTypes => ({
  type: USERS_REQUEST_START,
});

const usersRequestSuccess = (
  users: Array<IUserJSON>
): UsersRequestActionTypes => ({
  type: USERS_REQUEST_SUCCESS,
  users,
});

const usersRequestFailure = (error: string): UsersRequestActionTypes => ({
  type: USERS_REQUEST_FAILURE,
  error,
});

export const requestUsers = (): ThunkAction<void, State, null, Action<string>> => (
  async (dispatch) => {
    dispatch(usersRequestStart());

    try {
      const response = await fetch('/users');
      const json = await response.json();
      
      dispatch(usersRequestSuccess(json));
    } catch (e) {
      dispatch(usersRequestFailure(e));
    }
  }
)