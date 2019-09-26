import {
  COMMENT_REQUEST_SUCCESS,
} from '../actions/requestComment';

import {
  TOGGLE_COMMENT_REPLY,
  SET_COMMENT_REPLY_BODY,
} from '../actions/handleCommentReplies';

import {
  COMMENT_SUBMIT_START,
  COMMENT_SUBMIT_SUCCESS,
  COMMENT_SUBMIT_FAILURE,
} from '../actions/submitComment';

export interface CommentRepliesState {
  commentId: number;
  isOpen: boolean;
  body: string;
  isSubmitting: boolean;
  error: string;
}

const initialState: CommentRepliesState = {
  commentId: undefined,
  isOpen: false,
  body: '',
  isSubmitting: false,
  error: '',
}

const commentRepliesReducer = (
  state = initialState,
  action,
) => {
  switch (action.type) {
    case COMMENT_REQUEST_SUCCESS:
      return {
        ...initialState,
        commentId: action.comment.id,
      };

    case TOGGLE_COMMENT_REPLY:
      return {
        ...state,
        isOpen: !state.isOpen,
      };

    case SET_COMMENT_REPLY_BODY:
      return {
        ...state,
        body: action.body,
      };

    case COMMENT_SUBMIT_START:
      return {
        ...state,
        isSubmitting: true,
      };

    case COMMENT_SUBMIT_SUCCESS:
      return {
        ...state,
        isOpen: false,
        body: '',
        isSubmitting: false,
        error: '',
      };

    case COMMENT_SUBMIT_FAILURE:
      return {
        ...state,
        error: action.error,
      };

    default:
      return state;
  }
}

export default commentRepliesReducer;