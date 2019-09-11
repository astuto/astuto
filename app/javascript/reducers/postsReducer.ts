import IPost from '../interfaces/IPost';

import { FiltersState } from './filtersReducer';

import postReducer from './postReducer';
import filtersReducer from './filtersReducer';

import {
  PostsRequestActionTypes,
  POSTS_REQUEST_START,
  POSTS_REQUEST_SUCCESS,
  POSTS_REQUEST_FAILURE,
} from '../actions/requestPosts';

import {
  ChangeFiltersActionTypes,
  SET_SEARCH_FILTER,
  SET_POST_STATUS_FILTER,
} from '../actions/changeFilters';

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
  filters: { // improve
    searchQuery: '',
    postStatusId: null,
  },
};

const postsReducer = (
  state = initialState,
  action: PostsRequestActionTypes | ChangeFiltersActionTypes,
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
          action.posts.map(post => postReducer(undefined, {type: 'CONVERT', post})) //improve
          :
          [...state.items, ...action.posts.map(post => postReducer(undefined, {type: 'CONVERT', post}))],
        page: action.page,
        haveMore: action.posts.length === 15,
        areLoading: false,
        error: '',
      };

    case POSTS_REQUEST_FAILURE:
      return {
        ...state,
        areLoading: false,
        error: action.error,
      };

    case SET_SEARCH_FILTER:
    case SET_POST_STATUS_FILTER:
      return {
        ...state,
        filters: filtersReducer(state.filters, action),
      };

    default:
      return state;
  }
}

export default postsReducer;