import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';

import ILikeJSON from '../interfaces/json/ILike';

import { State } from '../reducers/rootReducer';

export const LIKES_REQUEST_START = 'LIKES_REQUEST_START';
interface LikesRequestStartAction {
  type: typeof LIKES_REQUEST_START;
}

export const LIKES_REQUEST_SUCCESS = 'LIKES_REQUEST_SUCCESS';
interface LikesRequestSuccessAction {
  type: typeof LIKES_REQUEST_SUCCESS;
  likes: Array<ILikeJSON>;
}

export const LIKES_REQUEST_FAILURE = 'LIKES_REQUEST_FAILURE';
interface LikesRequestFailureAction {
  type: typeof LIKES_REQUEST_FAILURE;
  error: string;
}

export type LikesRequestActionTypes =
  LikesRequestStartAction |
  LikesRequestSuccessAction |
  LikesRequestFailureAction;


const likesRequestStart = (): LikesRequestActionTypes => ({
  type: LIKES_REQUEST_START,
});

const likesRequestSuccess = (
  likes: Array<ILikeJSON>,
): LikesRequestActionTypes => ({
  type: LIKES_REQUEST_SUCCESS,
  likes,
});

const likesRequestFailure = (error: string): LikesRequestActionTypes => ({
  type: LIKES_REQUEST_FAILURE,
  error,
});

export const requestLikes = (
  postId: number,
): ThunkAction<void, State, null, Action<string>> => async (dispatch) => {
  dispatch(likesRequestStart());

  try {
    const response = await fetch(`/posts/${postId}/likes`);
    const json = await response.json();
    dispatch(likesRequestSuccess(json));
  } catch (e) {
    dispatch(likesRequestFailure(e));
  }
}