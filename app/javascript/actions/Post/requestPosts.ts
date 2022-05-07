import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';

import IPostJSON from '../../interfaces/json/IPost';

import { State } from '../../reducers/rootReducer';

export const POSTS_REQUEST_START = 'POSTS_REQUEST_START';
interface PostsRequestStartAction {
  type: typeof POSTS_REQUEST_START;
}

export const POSTS_REQUEST_SUCCESS = 'POSTS_REQUEST_SUCCESS';
interface PostsRequestSuccessAction {
  type: typeof POSTS_REQUEST_SUCCESS;
  posts: Array<IPostJSON>;
  page: number;
}

export const POSTS_REQUEST_FAILURE = 'POSTS_REQUEST_FAILURE';
interface PostsRequestFailureAction {
  type: typeof POSTS_REQUEST_FAILURE;
  error: string;
}

export type PostsRequestActionTypes =
  PostsRequestStartAction |
  PostsRequestSuccessAction |
  PostsRequestFailureAction;


const postsRequestStart = (): PostsRequestActionTypes => ({
  type: POSTS_REQUEST_START,
});

const postsRequestSuccess = (posts: Array<IPostJSON>, page: number): PostsRequestActionTypes => ({
  type: POSTS_REQUEST_SUCCESS,
  posts,
  page,
});

const postsRequestFailure = (error: string): PostsRequestActionTypes => ({
  type: POSTS_REQUEST_FAILURE,
  error,
});

export const requestPosts = (
  boardId: number,
  page: number,
  searchQuery: string,
  postStatusId: number,
): ThunkAction<void, State, null, Action<string>> => async (dispatch) => {
  dispatch(postsRequestStart());

  try {
    let params = '';
    params += `page=${page}`;
    params += `&board_id=${boardId}`;
    if (searchQuery) params += `&search=${searchQuery}`;
    if (postStatusId) params += `&post_status_id=${postStatusId}`;

    const response = await fetch(`/posts?${params}`);
    const json = await response.json();
    dispatch(postsRequestSuccess(json, page));
  } catch (e) {
    dispatch(postsRequestFailure(e));
  }
}