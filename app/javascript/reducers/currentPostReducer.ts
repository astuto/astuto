import {
  PostRequestActionTypes,
  POST_REQUEST_START,
  POST_REQUEST_SUCCESS,
  POST_REQUEST_FAILURE,
} from '../actions/requestPost';

import {
  ChangePostBoardSuccessAction,
  CHANGE_POST_BOARD_SUCCESS,
} from '../actions/changePostBoard';

import {
  ChangePostStatusSuccessAction,
  CHANGE_POST_STATUS_SUCCESS,
} from '../actions/changePostStatus';

import {
  LikesRequestActionTypes,
  LIKES_REQUEST_START,
  LIKES_REQUEST_SUCCESS,
  LIKES_REQUEST_FAILURE,
} from '../actions/requestLikes';

import {
  LikeActionTypes,
  LIKE_SUBMIT_SUCCESS,
} from '../actions/submitLike';

import {
  CommentsRequestActionTypes,
  COMMENTS_REQUEST_START,
  COMMENTS_REQUEST_SUCCESS,
  COMMENTS_REQUEST_FAILURE,
} from '../actions/requestComments';

import {
  HandleCommentRepliesType,
  TOGGLE_COMMENT_REPLY,
  SET_COMMENT_REPLY_BODY,
} from '../actions/handleCommentReplies';

import {
  CommentSubmitActionTypes,
  COMMENT_SUBMIT_START,
  COMMENT_SUBMIT_SUCCESS,
  COMMENT_SUBMIT_FAILURE,
} from '../actions/submitComment';

import {
  ToggleIsUpdateSuccessAction,
  TOGGLE_COMMENT_IS_UPDATE_SUCCESS,
} from '../actions/updateComment';

import postReducer from './postReducer';
import likesReducer from './likesReducer';
import commentsReducer from './commentsReducer';

import { LikesState } from './likesReducer';
import { CommentsState } from './commentsReducer';

import IPost from '../interfaces/IPost';

interface CurrentPostState {
  item: IPost;
  isLoading: boolean;
  error: string;
  likes: LikesState;
  comments: CommentsState;
}

const initialState: CurrentPostState = {
  item: postReducer(undefined, {} as PostRequestActionTypes),
  isLoading: false,
  error: '',
  likes: likesReducer(undefined, {} as LikesRequestActionTypes),
  comments: commentsReducer(undefined, {} as CommentsRequestActionTypes),
};

const currentPostReducer = (
  state = initialState,
  action:
    PostRequestActionTypes |
    ChangePostBoardSuccessAction |
    ChangePostStatusSuccessAction |
    LikesRequestActionTypes |
    LikeActionTypes |
    CommentsRequestActionTypes |
    HandleCommentRepliesType |
    CommentSubmitActionTypes |
    ToggleIsUpdateSuccessAction
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

    case CHANGE_POST_BOARD_SUCCESS:
    case CHANGE_POST_STATUS_SUCCESS:
      return {
        ...state,
        item: postReducer(state.item, action),
      };

    case LIKES_REQUEST_START:
    case LIKES_REQUEST_SUCCESS:
    case LIKES_REQUEST_FAILURE:
    case LIKE_SUBMIT_SUCCESS:
      return {
        ...state,
        likes: likesReducer(state.likes, action),
      };

    case COMMENTS_REQUEST_START:
    case COMMENTS_REQUEST_SUCCESS:
    case COMMENTS_REQUEST_FAILURE:
    case TOGGLE_COMMENT_REPLY:
    case SET_COMMENT_REPLY_BODY:
    case COMMENT_SUBMIT_START:
    case COMMENT_SUBMIT_SUCCESS:
    case COMMENT_SUBMIT_FAILURE:
    case TOGGLE_COMMENT_IS_UPDATE_SUCCESS:
      return {
        ...state,
        comments: commentsReducer(state.comments, action),
      };

    default:
      return state;
  }
}

export default currentPostReducer;