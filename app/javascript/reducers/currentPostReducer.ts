import {
  PostRequestActionTypes,
  POST_REQUEST_START,
  POST_REQUEST_SUCCESS,
  POST_REQUEST_FAILURE,
} from '../actions/requestPost';

import {
  ChangePostStatusSuccessAction,
  CHANGE_POST_STATUS_SUCCESS,
} from '../actions/changePostStatus';

import {
  CommentsRequestActionTypes,
  COMMENTS_REQUEST_START,
  COMMENTS_REQUEST_SUCCESS,
  COMMENTS_REQUEST_FAILURE,
} from '../actions/requestComments';

import postReducer from './postReducer';
import commentsReducer from './commentsReducer';

import { CommentsState } from './commentsReducer';

import IPost from '../interfaces/IPost';

interface CurrentPostState {
  item: IPost;
  isLoading: boolean;
  error: string;
  comments: CommentsState;
}

const initialState: CurrentPostState = {
  item: postReducer(undefined, {}),
  isLoading: false,
  error: '',
  comments: commentsReducer(undefined, {}),
};

const currentPostReducer = (
  state = initialState,
  action: PostRequestActionTypes | ChangePostStatusSuccessAction | CommentsRequestActionTypes,
): CurrentPostState => {
  switch (action.type) {
    case POST_REQUEST_START:
      return {
        ...state,
        isLoading: true,
      };

    case POST_REQUEST_SUCCESS:
      return {
        ...state,
        item: postReducer(undefined, action),
        isLoading: false,
        error: '',
      };

    case POST_REQUEST_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.error,
      };

    case CHANGE_POST_STATUS_SUCCESS:
      return {
        ...state,
        item: postReducer(state.item, action),
      };

    case COMMENTS_REQUEST_START:
    case COMMENTS_REQUEST_SUCCESS:
    case COMMENTS_REQUEST_FAILURE:
      return {
        ...state,
        comments: commentsReducer(state.comments, action),
      };

    default:
      return state;
  }
}

export default currentPostReducer;