import { Action } from "redux";
import { ThunkAction } from "redux-thunk";
import HttpStatus from "../../constants/http_status";
import buildRequestHeaders from "../../helpers/buildRequestHeaders";
import IPostStatusJSON from "../../interfaces/json/IPostStatus";
import { State } from "../../reducers/rootReducer";

export const POSTSTATUS_UPDATE_START = 'POSTSTATUS_UPDATE_START';
interface PostStatusUpdateStartAction {
  type: typeof POSTSTATUS_UPDATE_START;
}

export const POSTSTATUS_UPDATE_SUCCESS = 'POSTSTATUS_UPDATE_SUCCESS';
interface PostStatusUpdateSuccessAction {
  type: typeof POSTSTATUS_UPDATE_SUCCESS;
  postStatus: IPostStatusJSON;
}

export const POSTSTATUS_UPDATE_FAILURE = 'POSTSTATUS_UPDATE_FAILURE';
interface PostStatusUpdateFailureAction {
  type: typeof POSTSTATUS_UPDATE_FAILURE;
  error: string;
}

export type PostStatusUpdateActionTypes =
  PostStatusUpdateStartAction |
  PostStatusUpdateSuccessAction |
  PostStatusUpdateFailureAction;

const postStatusUpdateStart = (): PostStatusUpdateStartAction => ({
  type: POSTSTATUS_UPDATE_START,
});

const postStatusUpdateSuccess = (
  postStatusJSON: IPostStatusJSON,
): PostStatusUpdateSuccessAction => ({
  type: POSTSTATUS_UPDATE_SUCCESS,
  postStatus: postStatusJSON,
});

const postStatusUpdateFailure = (error: string): PostStatusUpdateFailureAction => ({
  type: POSTSTATUS_UPDATE_FAILURE,
  error,
});

export const updatePostStatus = (
  id: number,
  name: string,
  color: string,
  authenticityToken: string,
): ThunkAction<void, State, null, Action<string>> => async (dispatch) => {
  dispatch(postStatusUpdateStart());

  try {
    const res = await fetch(`/post_statuses/${id}`, {
      method: 'PATCH',
      headers: buildRequestHeaders(authenticityToken),
      body: JSON.stringify({
        post_status: {
          name,
          color,
        },
      }),
    });
    const json = await res.json();

    if (res.status === HttpStatus.OK) {
      dispatch(postStatusUpdateSuccess(json));
    } else {
      dispatch(postStatusUpdateFailure(json.error));
    }

    return Promise.resolve(res);
  } catch (e) {
    dispatch(postStatusUpdateFailure(e));
    
    return Promise.resolve(null);
  }
};