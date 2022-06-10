import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';

import IPostStatusJSON from '../../interfaces/json/IPostStatus';

import { State } from '../../reducers/rootReducer';

export const POST_STATUSES_REQUEST_START = 'POST_STATUSES_REQUEST_START';
interface PostStatusesRequestStartAction {
  type: typeof POST_STATUSES_REQUEST_START;
}

export const POST_STATUSES_REQUEST_SUCCESS = 'POST_STATUSES_REQUEST_SUCCESS';
interface PostStatusesRequestSuccessAction {
  type: typeof POST_STATUSES_REQUEST_SUCCESS;
  postStatuses: Array<IPostStatusJSON>;
}

export const POST_STATUSES_REQUEST_FAILURE = 'POST_STATUSES_REQUEST_FAILURE';
interface PostStatusesRequestFailureAction {
  type: typeof POST_STATUSES_REQUEST_FAILURE;
  error: string;
}

export type PostStatusesRequestActionTypes =
  PostStatusesRequestStartAction |
  PostStatusesRequestSuccessAction |
  PostStatusesRequestFailureAction;


const postStatusesRequestStart = (): PostStatusesRequestActionTypes => ({
  type: POST_STATUSES_REQUEST_START,
});

const postStatusesRequestSuccess = (
  postStatuses: Array<IPostStatusJSON>
): PostStatusesRequestActionTypes => ({
  type: POST_STATUSES_REQUEST_SUCCESS,
  postStatuses,
});

const postStatusesRequestFailure = (error: string): PostStatusesRequestActionTypes => ({
  type: POST_STATUSES_REQUEST_FAILURE,
  error,
});

export const requestPostStatuses = (): ThunkAction<void, State, null, Action<string>> => (
  async (dispatch) => {
    dispatch(postStatusesRequestStart());

    try {
      const response = await fetch('/post_statuses');
      const json = await response.json();
      dispatch(postStatusesRequestSuccess(json));
    } catch (e) {
      dispatch(postStatusesRequestFailure(e));
    }
  }
)