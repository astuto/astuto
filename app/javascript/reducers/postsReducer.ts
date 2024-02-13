import IPost from '../interfaces/IPost';

import { FiltersState } from './filtersReducer';

import postReducer from './postReducer';
import filtersReducer from './filtersReducer';

import { POSTS_PER_PAGE } from '../constants';

import {
  PostsRequestActionTypes,
  POSTS_REQUEST_START,
  POSTS_REQUEST_SUCCESS,
  POSTS_REQUEST_FAILURE,
} from '../actions/Post/requestPosts';

import {
  PostDeleteActionTypes,
  POST_DELETE_SUCCESS,
} from '../actions/Post/deletePost';

import { postRequestSuccess } from '../actions/Post/requestPost';

import {
  ChangeFiltersActionTypes,
  SET_SEARCH_FILTER,
  SET_POST_STATUS_FILTER,
  SET_SORT_BY_FILTER,
} from '../actions/changeFilters';

import {
  LikeActionTypes,
  LIKE_SUBMIT_SUCCESS,
} from '../actions/Like/submitLike';

export interface PostsState {
  items: Array<IPost>;
  page: number;
  haveMore: boolean;
  areLoading: boolean;
  error: string;
  filters: FiltersState;
}

const initialState: PostsState = {
  items: [],
  page: 0,
  haveMore: true,
  areLoading: false,
  error: '',
  filters: filtersReducer(undefined, {} as ChangeFiltersActionTypes),
};

const postsReducer = (
  state = initialState,
  action:
    PostsRequestActionTypes |
    PostDeleteActionTypes |
    ChangeFiltersActionTypes |
    LikeActionTypes,
): PostsState => {
  switch (action.type) {
    case POSTS_REQUEST_START:
      return {
        ...state,
        areLoading: true,
      };

    case POSTS_REQUEST_SUCCESS:
      return {
        ...state,
        items: action.page === 1 ?
          action.posts.map(post => postReducer(undefined, postRequestSuccess(post)))
          :
          [...state.items, ...action.posts.map(post => postReducer(undefined, postRequestSuccess(post)))],
        page: action.page,
        haveMore: action.posts.length === POSTS_PER_PAGE,
        areLoading: false,
        error: '',
      };

    case POSTS_REQUEST_FAILURE:
      return {
        ...state,
        areLoading: false,
        error: action.error,
      };

    case POST_DELETE_SUCCESS:
      return {
        ...state,
        items: state.items.filter(post => post.id !== action.postId),
      };

    case SET_SEARCH_FILTER:
    case SET_POST_STATUS_FILTER:
    case SET_SORT_BY_FILTER:
      return {
        ...state,
        filters: filtersReducer(state.filters, action),
      };

    case LIKE_SUBMIT_SUCCESS:
      return {
        ...state,
        items: state.items.map(post => {
          if (action.postId === post.id) {
            return action.isLike ?
              { ...post, likeCount: post.likeCount + 1, liked: 1 }
              :
              { ...post, likeCount: post.likeCount - 1, liked: 0 }
          } else return post;
        }),
      };

    default:
      return state;
  }
}

export default postsReducer;