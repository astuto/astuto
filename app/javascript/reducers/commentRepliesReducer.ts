import {
  COMMENT_REQUEST_SUCCESS,
} from '../actions/requestComment';
import {
  HandleCommentRepliesType,
  TOGGLE_COMMENT_REPLY,
  SET_COMMENT_REPLY_BODY,
} from '../actions/handleCommentReplies';

export interface CommentRepliesState {
  commentId: number;
  isOpen: boolean;
  body: string;
}

const initialState: CommentRepliesState = {
  commentId: undefined,
  isOpen: false,
  body: '',
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

    default:
      return state;
  }
}

export default commentRepliesReducer;