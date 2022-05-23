import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';

import IFollowJSON from '../../interfaces/json/IFollow';

import { State } from '../../reducers/rootReducer';

export const FOLLOW_REQUEST_START = 'FOLLOW_REQUEST_START';
interface FollowRequestStartAction {
  type: typeof FOLLOW_REQUEST_START;
}

export const FOLLOW_REQUEST_SUCCESS = 'FOLLOW_REQUEST_SUCCESS';
interface FollowRequestSuccessAction {
  type: typeof FOLLOW_REQUEST_SUCCESS;
  follow: IFollowJSON;
}

export const FOLLOW_REQUEST_FAILURE = 'FOLLOW_REQUEST_FAILURE';
interface FollowRequestFailureAction {
  type: typeof FOLLOW_REQUEST_FAILURE;
  error: string;
}

export type FollowRequestActionTypes =
  FollowRequestStartAction |
  FollowRequestSuccessAction |
  FollowRequestFailureAction;

const followRequestStart = (): FollowRequestActionTypes => ({
  type: FOLLOW_REQUEST_START,
});

const followRequestSuccess = (
  follow: IFollowJSON,
): FollowRequestActionTypes => ({
  type: FOLLOW_REQUEST_SUCCESS,
  follow,
});

const followRequestFailure = (error: string): FollowRequestActionTypes => ({
  type: FOLLOW_REQUEST_FAILURE,
  error,
});

export const requestFollow = (
  postId: number,
): ThunkAction<void, State, null, Action<string>> => async (dispatch) => {
  dispatch(followRequestStart());

  try {
    const response = await fetch(`/posts/${postId}/follows`);
    const json = await response.json();
    dispatch(followRequestSuccess(json));
  } catch (e) {
    dispatch(followRequestFailure(e));
  }
};