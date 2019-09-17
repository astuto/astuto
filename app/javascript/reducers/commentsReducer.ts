import {
  CommentsRequestActionTypes,
  COMMENTS_REQUEST_START,
  COMMENTS_REQUEST_SUCCESS,
  COMMENTS_REQUEST_FAILURE,
} from '../actions/requestComments';

import { commentRequestSuccess } from '../actions/requestComment';

import {
  HandleCommentRepliesType,
  TOGGLE_COMMENT_REPLY,
  SET_COMMENT_REPLY_BODY,
} from '../actions/handleCommentReplies';

import commentReducer from './commentReducer';
import commentRepliesReducer from './commentRepliesReducer';

import IComment from '../interfaces/IComment';
import { CommentRepliesState } from './commentRepliesReducer';

export interface CommentsState {
  items: Array<IComment>;
  replies: Array<CommentRepliesState>;
  areLoading: boolean;
  error: string;
}

const initialState: CommentsState = {
  items: [],
  replies: [],
  areLoading: false,
  error: '',
};

const commentsReducer = (
  state = initialState,
  action,
): CommentsState => {
  switch (action.type) {
    case COMMENTS_REQUEST_START:
      return {
        ...state,
        areLoading: true,
      };

    case COMMENTS_REQUEST_SUCCESS:
      return {
        ...state,
        items: action.comments.map(
          comment => commentReducer(undefined, commentRequestSuccess(comment))
        ),
        replies: action.comments.map(
          comment => commentRepliesReducer(undefined, commentRequestSuccess(comment))
        ),
        areLoading: false,
        error: '',
      };

    case COMMENTS_REQUEST_FAILURE:
      return {
        ...state,
        areLoading: false,
        error: action.error,
      };

    case TOGGLE_COMMENT_REPLY:
    case SET_COMMENT_REPLY_BODY:
      return {
        ...state,
        replies: state.replies.map(
          reply => (
            reply.commentId === action.commentId ?
              commentRepliesReducer(reply, action)
            :
              reply
          )
        ),
      };

    default:
      return state;
  }
}

export default commentsReducer;