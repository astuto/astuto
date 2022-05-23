import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';

import IPostStatusChangeJSON from '../../interfaces/json/IPostStatusChange';

import { State } from '../../reducers/rootReducer';

export const POST_STATUS_CHANGES_REQUEST_START = 'POST_STATUS_CHANGES_REQUEST_START';
interface PostStatusChangesRequestStartAction {
  type: typeof POST_STATUS_CHANGES_REQUEST_START;
}

export const POST_STATUS_CHANGES_REQUEST_SUCCESS = 'POST_STATUS_CHANGES_REQUEST_SUCCESS';
interface PostStatusChangesRequestSuccessAction {
  type: typeof POST_STATUS_CHANGES_REQUEST_SUCCESS;
  postStatusChanges: Array<IPostStatusChangeJSON>;
}

export const POST_STATUS_CHANGES_REQUEST_FAILURE = 'POST_STATUS_CHANGES_REQUEST_FAILURE';
interface PostStatusChangesRequestFailureAction {
  type: typeof POST_STATUS_CHANGES_REQUEST_FAILURE;
  error: string;
}

export type PostStatusChangesRequestActionTypes =
  PostStatusChangesRequestStartAction |
  PostStatusChangesRequestSuccessAction |
  PostStatusChangesRequestFailureAction;

const postStatusChangesRequestStart = (): PostStatusChangesRequestActionTypes => ({
  type: POST_STATUS_CHANGES_REQUEST_START,
});

const postStatusChangesRequestSuccess = (
  postStatusChanges: Array<IPostStatusChangeJSON>,
): PostStatusChangesRequestActionTypes => ({
  type: POST_STATUS_CHANGES_REQUEST_SUCCESS,
  postStatusChanges,
});

const postStatusChangesRequestFailure = (error: string): PostStatusChangesRequestActionTypes => ({
  type: POST_STATUS_CHANGES_REQUEST_FAILURE,
  error,
});

export const requestPostStatusChanges = (
  postId: number,
): ThunkAction<void, State, null, Action<string>> => async (dispatch) => {
  dispatch(postStatusChangesRequestStart());

  try {
    const response = await fetch(`/posts/${postId}/post_status_changes`);
    const json = await response.json();
    dispatch(postStatusChangesRequestSuccess(json));
  } catch (e) {
    dispatch(postStatusChangesRequestFailure(e));
  }
};