import {
  PostStatusesRequestActionTypes,
  POST_STATUSES_REQUEST_START,
  POST_STATUSES_REQUEST_SUCCESS,
  POST_STATUSES_REQUEST_FAILURE,
} from '../actions/requestPostStatuses';

import {
  PostStatusOrderUpdateActionTypes,
  POSTSTATUS_ORDER_UPDATE_START,
} from '../actions/updatePostStatusOrder';

import {
  PostStatusDeleteActionTypes,
  POST_STATUS_DELETE_SUCCESS,
} from '../actions/deletePostStatus';

import {
  PostStatusSubmitActionTypes,
  POSTSTATUS_SUBMIT_SUCCESS,
} from '../actions/submitPostStatus';

import IPostStatus from '../interfaces/IPostStatus';

export interface PostStatusesState {
  items: Array<IPostStatus>;
  areLoading: boolean;
  error: string;
}

const initialState: PostStatusesState = {
  items: [],
  areLoading: false,
  error: '',
}

const postStatusesReducer = (
  state = initialState,
  action: PostStatusesRequestActionTypes |
    PostStatusOrderUpdateActionTypes |
    PostStatusDeleteActionTypes |
    PostStatusSubmitActionTypes
) => {
  switch (action.type) {
    case POST_STATUSES_REQUEST_START:
      return {
        ...state,
        areLoading: true,
      };

    case POST_STATUSES_REQUEST_SUCCESS:
      return {
        ...state,
        items: action.postStatuses.map(postStatus => ({
          id: postStatus.id,
          name: postStatus.name,
          color: postStatus.color,
        })),
        areLoading: false,
        error: '',
      };

    case POST_STATUSES_REQUEST_FAILURE:
      return {
        ...state,
        areLoading: false,
        error: action.error,
      };

    case POSTSTATUS_ORDER_UPDATE_START:
      return {
        ...state,
        items: action.newOrder,
      };

    case POST_STATUS_DELETE_SUCCESS:
      return {
        ...state,
        items: state.items.filter(postStatus => postStatus.id !== action.id),
      };

    case POSTSTATUS_SUBMIT_SUCCESS:
      return {
        ...state,
        items: [...state.items, action.postStatus],
      };

    default:
      return state;
  }
}

export default postStatusesReducer;