import {
  PostStatusesRequestActionTypes,
  POST_STATUSES_REQUEST_START,
  POST_STATUSES_REQUEST_SUCCESS,
  POST_STATUSES_REQUEST_FAILURE,
} from '../actions/PostStatus/requestPostStatuses';

import {
  PostStatusOrderUpdateActionTypes,
  POSTSTATUS_ORDER_UPDATE_START,
  POSTSTATUS_ORDER_UPDATE_FAILURE,
} from '../actions/PostStatus/updatePostStatusOrder';

import {
  PostStatusDeleteActionTypes,
  POST_STATUS_DELETE_SUCCESS,
} from '../actions/PostStatus/deletePostStatus';

import {
  PostStatusSubmitActionTypes,
  POSTSTATUS_SUBMIT_SUCCESS,
} from '../actions/PostStatus/submitPostStatus';

import {
  PostStatusUpdateActionTypes,
  POSTSTATUS_UPDATE_SUCCESS,
} from '../actions/PostStatus/updatePostStatus';

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
    PostStatusSubmitActionTypes |
    PostStatusUpdateActionTypes
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
          order: postStatus.order,
          showInRoadmap: postStatus.show_in_roadmap,
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

    case POSTSTATUS_SUBMIT_SUCCESS:
      return {
        ...state,
        items: [...state.items, action.postStatus],
      };

    case POSTSTATUS_UPDATE_SUCCESS:
      return {
        ...state,
        items: state.items.map(postStatus => {
          if (postStatus.id !== action.postStatus.id) return postStatus;
          return {
            ...postStatus,
            name: action.postStatus.name,
            color: action.postStatus.color,
            showInRoadmap: action.postStatus.show_in_roadmap,
          };
        }),
      };

    case POST_STATUS_DELETE_SUCCESS:
      return {
        ...state,
        items: state.items.filter(postStatus => postStatus.id !== action.id),
      };

    case POSTSTATUS_ORDER_UPDATE_START:
      return {
        ...state,
        items: action.newOrder,
      };

    case POSTSTATUS_ORDER_UPDATE_FAILURE:
      return {
        ...state,
        items: action.oldOrder,
      };

    default:
      return state;
  }
}

export default postStatusesReducer;