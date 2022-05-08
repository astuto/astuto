import { Action } from "redux";
import { ThunkAction } from "redux-thunk";
import HttpStatus from "../../constants/http_status";
import buildRequestHeaders from "../../helpers/buildRequestHeaders";
import { State } from "../../reducers/rootReducer";

export const POST_STATUS_DELETE_START = 'POST_STATUS_DELETE_START';
interface PostStatusDeleteStartAction {
  type: typeof POST_STATUS_DELETE_START;
}

export const POST_STATUS_DELETE_SUCCESS = 'POST_STATUS_DELETE_SUCCESS';
interface PostStatusDeleteSuccessAction {
  type: typeof POST_STATUS_DELETE_SUCCESS;
  id: number;
}

export const POST_STATUS_DELETE_FAILURE = 'POST_STATUS_DELETE_FAILURE';
interface PostStatusDeleteFailureAction {
  type: typeof POST_STATUS_DELETE_FAILURE;
  error: string;
}

export type PostStatusDeleteActionTypes =
  PostStatusDeleteStartAction |
  PostStatusDeleteSuccessAction |
  PostStatusDeleteFailureAction;

const postStatusDeleteStart = (): PostStatusDeleteStartAction => ({
  type: POST_STATUS_DELETE_START,
});

const postStatusDeleteSuccess = (
  id: number,
): PostStatusDeleteSuccessAction => ({
  type: POST_STATUS_DELETE_SUCCESS,
  id,
});

const postStatusDeleteFailure = (error: string): PostStatusDeleteFailureAction => ({
  type: POST_STATUS_DELETE_FAILURE,
  error,
});

export const deletePostStatus = (
  id: number,
  authenticityToken: string,
): ThunkAction<void, State, null, Action<string>> => (
  async (dispatch) => {
    dispatch(postStatusDeleteStart());

    try {
      const res = await fetch(`/post_statuses/${id}`, {
        method: 'DELETE',
        headers: buildRequestHeaders(authenticityToken),
      });
      const json = await res.json();

      if (res.status === HttpStatus.Accepted) {
        dispatch(postStatusDeleteSuccess(id));
      } else {
        dispatch(postStatusDeleteFailure(json.error));
      }
    } catch (e) {
      dispatch(postStatusDeleteFailure(e));
    }
  }
);