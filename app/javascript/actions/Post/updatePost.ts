import { Action } from "redux";
import { ThunkAction } from "redux-thunk";
import HttpStatus from "../../constants/http_status";
import buildRequestHeaders from "../../helpers/buildRequestHeaders";
import IPostJSON from "../../interfaces/json/IPost";
import { State } from "../../reducers/rootReducer";

export const POST_UPDATE_START = 'POST_UPDATE_START';
interface PostUpdateStartAction {
  type: typeof POST_UPDATE_START;
}

export const POST_UPDATE_SUCCESS = 'POST_UPDATE_SUCCESS';
interface PostUpdateSuccessAction {
  type: typeof POST_UPDATE_SUCCESS;
  post: IPostJSON;
}

export const POST_UPDATE_FAILURE = 'POST_UPDATE_FAILURE';
interface PostUpdateFailureAction {
  type: typeof POST_UPDATE_FAILURE;
  error: string;
}

export type PostUpdateActionTypes =
  PostUpdateStartAction |
  PostUpdateSuccessAction |
  PostUpdateFailureAction;

const postUpdateStart = (): PostUpdateStartAction => ({
  type: POST_UPDATE_START,
});

const postUpdateSuccess = (
  postJSON: IPostJSON,
): PostUpdateSuccessAction => ({
  type: POST_UPDATE_SUCCESS,
  post: postJSON,
});

const postUpdateFailure = (error: string): PostUpdateFailureAction => ({
  type: POST_UPDATE_FAILURE,
  error,
});

export const updatePost = (
  id: number,
  title: string,
  description: string,
  boardId: number,
  postStatusId: number,
  authenticityToken: string,
): ThunkAction<void, State, null, Action<string>> => async (dispatch) => {
  dispatch(postUpdateStart());

  try {
    const res = await fetch(`/posts/${id}`, {
      method: 'PATCH',
      headers: buildRequestHeaders(authenticityToken),
      body: JSON.stringify({
        post: {
          title,
          description,
          board_id: boardId,
          post_status_id: postStatusId,
        }
      }),
    });
    const json = await res.json();

    if (res.status === HttpStatus.OK) {
      dispatch(postUpdateSuccess(json));
    } else {
      dispatch(postUpdateFailure(json.error));
    }

    return Promise.resolve(res);
  } catch (e) {
    dispatch(postUpdateFailure(e));
    
    return Promise.resolve(null);
  }
};