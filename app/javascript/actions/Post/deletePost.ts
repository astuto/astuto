import { Action } from "redux";
import { ThunkAction } from "redux-thunk";

import HttpStatus from "../../constants/http_status";
import buildRequestHeaders from "../../helpers/buildRequestHeaders";
import { State } from "../../reducers/rootReducer";

export const POST_DELETE_START = 'POST_DELETE_START';
interface PostDeleteStartAction {
  type: typeof POST_DELETE_START;
}

export const POST_DELETE_SUCCESS = 'POST_DELETE_SUCCESS';
interface PostDeleteSuccessAction {
  type: typeof POST_DELETE_SUCCESS;
  postId: number;
}

export const POST_DELETE_FAILURE = 'POST_DELETE_FAILURE';
interface PostDeleteFailureAction {
  type: typeof POST_DELETE_FAILURE;
  error: string;
}

export type PostDeleteActionTypes =
  PostDeleteStartAction |
  PostDeleteSuccessAction |
  PostDeleteFailureAction;

const postDeleteStart = (): PostDeleteStartAction => ({
  type: POST_DELETE_START,
});

const postDeleteSuccess = (
  postId: number,
): PostDeleteSuccessAction => ({
  type: POST_DELETE_SUCCESS,
  postId,
});

const postDeleteFailure = (error: string): PostDeleteFailureAction => ({
  type: POST_DELETE_FAILURE,
  error,
});

export const deletePost = (
  postId: number,
  authenticityToken: string,
): ThunkAction<void, State, null, Action<string>> => (
  async (dispatch) => {
    dispatch(postDeleteStart());

    try {
      const res = await fetch(`/posts/${postId}`, {
        method: 'DELETE',
        headers: buildRequestHeaders(authenticityToken),
      });
      const json = await res.json();

      if (res.status === HttpStatus.Accepted) {
        dispatch(postDeleteSuccess(postId));
      } else {
        dispatch(postDeleteFailure(json.error));
      }
    } catch (e) {
      dispatch(postDeleteFailure(e));
    }
  }
);