import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';

import IPostJSON from '../interfaces/json/IPost';

import { State } from '../reducers/rootReducer';

export const POST_REQUEST_START = 'POST_REQUEST_START';
interface PostRequestStartAction {
  type: typeof POST_REQUEST_START;
}

export const POST_REQUEST_SUCCESS = 'POST_REQUEST_SUCCESS';
interface PostRequestSuccessAction {
  type: typeof POST_REQUEST_SUCCESS;
  post: IPostJSON;
}

export const POST_REQUEST_FAILURE = 'POST_REQUEST_FAILURE';
interface PostRequestFailureAction {
  type: typeof POST_REQUEST_FAILURE;
  error: string;
}

export type PostRequestActionTypes =
  PostRequestStartAction |
  PostRequestSuccessAction |
  PostRequestFailureAction;


const postRequestStart = (): PostRequestActionTypes => ({
  type: POST_REQUEST_START,
});

export const postRequestSuccess = (post: IPostJSON): PostRequestActionTypes => ({
  type: POST_REQUEST_SUCCESS,
  post,
});

const postRequestFailure = (error: string): PostRequestActionTypes => ({
  type: POST_REQUEST_FAILURE,
  error,
});

export const requestPost = (
  postId: number,
): ThunkAction<void, State, null, Action<string>> => async (dispatch) => {
  dispatch(postRequestStart());

  try {
    const response = await fetch(`/posts/${postId}.json`);
    const json = await response.json();
    dispatch(postRequestSuccess(json));
  } catch (e) {
    dispatch(postRequestFailure(e));
  }
}