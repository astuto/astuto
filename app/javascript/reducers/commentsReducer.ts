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

import {
  CommentSubmitActionTypes,
  COMMENT_SUBMIT_START,
  COMMENT_SUBMIT_SUCCESS,
  COMMENT_SUBMIT_FAILURE,
} from '../actions/submitComment';

import commentReducer from './commentReducer';
import replyFormsReducer from './replyFormsReducer';

import { ReplyFormState } from './replyFormReducer';

import IComment from '../interfaces/IComment';
import ICommentJSON from '../interfaces/json/IComment';

export interface CommentsState {
  items: Array<IComment>;
  replyForms: Array<ReplyFormState>;
  areLoading: boolean;
  error: string;
}

const initialState: CommentsState = {
  items: [],
  replyForms: [],
  areLoading: false,
  error: '',
};

const commentsReducer = (
  state = initialState,
  action:
    CommentsRequestActionTypes |
    HandleCommentRepliesType |
    CommentSubmitActionTypes
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
        replyForms: replyFormsReducer(state.replyForms, action),
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
        replyForms: replyFormsReducer(state.replyForms, action),
      };

    case COMMENT_SUBMIT_START:
    case COMMENT_SUBMIT_FAILURE:
      return {
        ...state,
        replyForms: replyFormsReducer(state.replyForms, action),
      };

    case COMMENT_SUBMIT_SUCCESS:
      return {
        ...state,
        items: [commentReducer(undefined, commentRequestSuccess(action.comment)), ...state.items],
        replyForms: replyFormsReducer(state.replyForms, action),
      };

    default:
      return state;
  }
}

export default commentsReducer;