import { Action } from "redux";
import { ThunkAction } from "redux-thunk";
import HttpStatus from "../../constants/http_status";
import buildRequestHeaders from "../../helpers/buildRequestHeaders";
import { State } from "../../reducers/rootReducer";

export const COMMENT_DELETE_START = 'COMMENT_DELETE_START';
interface CommentDeleteStartAction {
  type: typeof COMMENT_DELETE_START;
}

export const COMMENT_DELETE_SUCCESS = 'COMMENT_DELETE_SUCCESS';
interface CommentDeleteSuccessAction {
  type: typeof COMMENT_DELETE_SUCCESS;
  postId: number;
  commentId: number;
}

export const COMMENT_DELETE_FAILURE = 'COMMENT_DELETE_FAILURE';
interface CommentDeleteFailureAction {
  type: typeof COMMENT_DELETE_FAILURE;
  error: string;
}

export type CommentDeleteActionTypes =
  CommentDeleteStartAction |
  CommentDeleteSuccessAction |
  CommentDeleteFailureAction;

const commentDeleteStart = (): CommentDeleteStartAction => ({
  type: COMMENT_DELETE_START,
});

const commentDeleteSuccess = (
  postId: number,
  commentId: number,
): CommentDeleteSuccessAction => ({
  type: COMMENT_DELETE_SUCCESS,
  postId,
  commentId,
});

const commentDeleteFailure = (error: string): CommentDeleteFailureAction => ({
  type: COMMENT_DELETE_FAILURE,
  error,
});

export const deleteComment = (
  postId: number,
  commentId: number,
  authenticityToken: string,
): ThunkAction<void, State, null, Action<string>> => (
  async (dispatch) => {
    dispatch(commentDeleteStart());

    try {
      const res = await fetch(`/posts/${postId}/comments/${commentId}`, {
        method: 'DELETE',
        headers: buildRequestHeaders(authenticityToken),
      });
      const json = await res.json();

      if (res.status === HttpStatus.Accepted) {
        dispatch(commentDeleteSuccess(postId, commentId));
      } else {
        dispatch(commentDeleteFailure(json.error));
      }
    } catch (e) {
      dispatch(commentDeleteFailure(e));
    }
  }
);