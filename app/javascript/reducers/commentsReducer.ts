import {
  COMMENTS_REQUEST_START,
  COMMENTS_REQUEST_SUCCESS,
  COMMENTS_REQUEST_FAILURE,
} from '../actions/requestComments';

import { commentRequestSuccess } from '../actions/requestComment';

import {
  TOGGLE_COMMENT_REPLY,
  SET_COMMENT_REPLY_BODY,
} from '../actions/handleCommentReplies';

import {
  COMMENT_SUBMIT_START,
  COMMENT_SUBMIT_SUCCESS,
  COMMENT_SUBMIT_FAILURE,
} from '../actions/submitComment';

import commentReducer from './commentReducer';
import commentRepliesReducer from './commentRepliesReducer';

import IComment from '../interfaces/IComment';
import ICommentJSON from '../interfaces/json/IComment';
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
          (comment: ICommentJSON) => commentReducer(undefined, commentRequestSuccess(comment))
        ),
        replies: [commentRepliesReducer(undefined, {type: 'COMMENT_REQUEST_SUCCESS', comment: { id: -1 } }),
          ...action.comments.map(
            (comment: ICommentJSON) => commentRepliesReducer(undefined, commentRequestSuccess(comment))
        )],
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

    case COMMENT_SUBMIT_START:
    case COMMENT_SUBMIT_FAILURE:
      return {
        ...state,
        replies: state.replies.map(
          reply => (
            reply.commentId === action.parentId ?
              commentRepliesReducer(reply, action)
            :
              reply
          )
        ),
      };

    case COMMENT_SUBMIT_SUCCESS:
      return {
        ...state,
        items: [commentReducer(undefined, commentRequestSuccess(action.comment)), ...state.items],
        replies: [
          ...state.replies.map(
            reply => (
              reply.commentId === action.comment.parent_id ?
                commentRepliesReducer(reply, action)
              :
                reply
            )
          ),
          commentRepliesReducer(undefined, commentRequestSuccess(action.comment)),
        ],
      };

    default:
      return state;
  }
}

export default commentsReducer;