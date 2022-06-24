import { Action } from "redux";
import { ThunkAction } from "redux-thunk";

import HttpStatus from "../../constants/http_status";
import buildRequestHeaders from "../../helpers/buildRequestHeaders";
import IUserJSON from "../../interfaces/json/IUser";
import { State } from "../../reducers/rootReducer";

export const USER_UPDATE_START = 'USER_UPDATE_START';
interface UserUpdateStartAction {
  type: typeof USER_UPDATE_START;
}

export const USER_UPDATE_SUCCESS = 'USER_UPDATE_SUCCESS';
interface UserUpdateSuccessAction {
  type: typeof USER_UPDATE_SUCCESS;
  user: IUserJSON;
}

export const USER_UPDATE_FAILURE = 'USER_UPDATE_FAILURE';
interface UserUpdateFailureAction {
  type: typeof USER_UPDATE_FAILURE;
  error: string;
}

export type UserUpdateActionTypes =
  UserUpdateStartAction |
  UserUpdateSuccessAction |
  UserUpdateFailureAction;

const userUpdateStart = (): UserUpdateStartAction => ({
  type: USER_UPDATE_START,
});

const userUpdateSuccess = (
  userJSON: IUserJSON,
): UserUpdateSuccessAction => ({
  type: USER_UPDATE_SUCCESS,
  user: userJSON,
});

const userUpdateFailure = (error: string): UserUpdateFailureAction => ({
  type: USER_UPDATE_FAILURE,
  error,
});

interface UpdateUserParams {
  id: number;
  role?: string;
  status?: string;
  authenticityToken: string;
}

export const updateUser = ({
  id,
  role = null,
  status = null,
  authenticityToken,
}: UpdateUserParams): ThunkAction<void, State, null, Action<string>> => async (dispatch) => {
  dispatch(userUpdateStart());

  const user = Object.assign({},
    role !== null ? { role } : null,
    status !== null ? { status } : null,
  );

  try {
    const res = await fetch(`/users/${id}`, {
      method: 'PATCH',
      headers: buildRequestHeaders(authenticityToken),
      body: JSON.stringify({ user }),
    });
    const json = await res.json();

    if (res.status === HttpStatus.OK) {
      dispatch(userUpdateSuccess(json));
    } else {
      dispatch(userUpdateFailure(json.error));
    }

    return Promise.resolve(res);
  } catch (e) {
    dispatch(userUpdateFailure(e));
    
    return Promise.resolve(null);
  }
};