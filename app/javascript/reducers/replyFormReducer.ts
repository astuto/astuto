import {
  CommentRequestSuccessAction,
  COMMENT_REQUEST_SUCCESS,
} from '../actions/Comment/requestComment';

import {
  HandleCommentRepliesType,
  TOGGLE_COMMENT_REPLY,
  SET_COMMENT_REPLY_BODY,
  TOGGLE_COMMENT_IS_POST_UPDATE_FLAG,
} from '../actions/Comment/handleCommentReplies';

import {
  CommentSubmitActionTypes,
  COMMENT_SUBMIT_START,
  COMMENT_SUBMIT_SUCCESS,
  COMMENT_SUBMIT_FAILURE,
} from '../actions/Comment/submitComment';

export interface ReplyFormState {
  commentId: number;
  isOpen: boolean;
  body: string;
  isPostUpdate: boolean;
  isSubmitting: boolean;
  error: string;
}

const initialState: ReplyFormState = {
  commentId: undefined,
  isOpen: false,
  body: '',
  isPostUpdate: false,
  isSubmitting: false,
  error: '',
}

const replyFormReducer = (
  state = initialState,
  action:
    CommentRequestSuccessAction |
    HandleCommentRepliesType |
    CommentSubmitActionTypes,
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

    case TOGGLE_COMMENT_IS_POST_UPDATE_FLAG:
      return {
        ...state,
        isPostUpdate: !state.isPostUpdate,
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
        isPostUpdate: false,
        isSubmitting: false,
        error: '',
      };

    case COMMENT_SUBMIT_FAILURE:
      return {
        ...state,
        error: action.error,
        isSubmitting: false,
      };

    default:
      return state;
  }
}

export default replyFormReducer;