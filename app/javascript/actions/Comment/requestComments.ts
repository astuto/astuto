import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';

import ICommentJSON from '../../interfaces/json/IComment';

import { State } from '../../reducers/rootReducer';

export const COMMENTS_REQUEST_START = 'COMMENTS_REQUEST_START';
interface CommentsRequestStartAction {
  type: typeof COMMENTS_REQUEST_START;
}

export const COMMENTS_REQUEST_SUCCESS = 'COMMENTS_REQUEST_SUCCESS';
interface CommentsRequestSuccessAction {
  type: typeof COMMENTS_REQUEST_SUCCESS;
  comments: Array<ICommentJSON>;
}

export const COMMENTS_REQUEST_FAILURE = 'COMMENTS_REQUEST_FAILURE';
interface CommentsRequestFailureAction {
  type: typeof COMMENTS_REQUEST_FAILURE;
  error: string;
}

export type CommentsRequestActionTypes =
  CommentsRequestStartAction |
  CommentsRequestSuccessAction |
  CommentsRequestFailureAction;


const commentsRequestStart = (): CommentsRequestActionTypes => ({
  type: COMMENTS_REQUEST_START,
});

const commentsRequestSuccess = (
  comments: Array<ICommentJSON>,
): CommentsRequestActionTypes => ({
  type: COMMENTS_REQUEST_SUCCESS,
  comments,
});

const commentsRequestFailure = (error: string): CommentsRequestActionTypes => ({
  type: COMMENTS_REQUEST_FAILURE,
  error,
});

export const requestComments = (
  postId: number,
): ThunkAction<void, State, null, Action<string>> => async (dispatch) => {
  dispatch(commentsRequestStart());

  try {
    const response = await fetch(`/posts/${postId}/comments`);
    const json = await response.json();
    dispatch(commentsRequestSuccess(json));
  } catch (e) {
    dispatch(commentsRequestFailure(e));
  }
}