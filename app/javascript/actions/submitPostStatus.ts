import { Action } from "redux";
import { ThunkAction } from "redux-thunk";
import buildRequestHeaders from "../helpers/buildRequestHeaders";
import IPostStatusJSON from "../interfaces/json/IPostStatus";
import { State } from "../reducers/rootReducer";

export const POSTSTATUS_SUBMIT_START = 'POSTSTATUS_SUBMIT_START';
interface PostStatusSubmitStartAction {
  type: typeof POSTSTATUS_SUBMIT_START;
}

export const POSTSTATUS_SUBMIT_SUCCESS = 'POSTSTATUS_SUBMIT_SUCCESS';
interface PostStatusSubmitSuccessAction {
  type: typeof POSTSTATUS_SUBMIT_SUCCESS;
  postStatus: IPostStatusJSON;
}

export const POSTSTATUS_SUBMIT_FAILURE = 'POSTSTATUS_SUBMIT_FAILURE';
interface PostStatusSubmitFailureAction {
  type: typeof POSTSTATUS_SUBMIT_FAILURE;
  error: string;
}

export type PostStatusSubmitActionTypes =
  PostStatusSubmitStartAction |
  PostStatusSubmitSuccessAction |
  PostStatusSubmitFailureAction;

const postStatusSubmitStart = (): PostStatusSubmitStartAction => ({
  type: POSTSTATUS_SUBMIT_START,
});

const postStatusSubmitSuccess = (
  postStatusJSON: IPostStatusJSON,
): PostStatusSubmitSuccessAction => ({
  type: POSTSTATUS_SUBMIT_SUCCESS,
  postStatus: postStatusJSON,
});

const postStatusSubmitFailure = (error: string): PostStatusSubmitFailureAction => ({
  type: POSTSTATUS_SUBMIT_FAILURE,
  error,
});

export const submitPostStatus = (
  name: string,
  color: string,
  authenticityToken: string,
): ThunkAction<void, State, null, Action<string>> => async (dispatch) => {
  dispatch(postStatusSubmitStart());

  try {
    const res = await fetch(`/post_statuses`, {
      method: 'POST',
      headers: buildRequestHeaders(authenticityToken),
      body: JSON.stringify({
        post_status: {
          name,
          color,
        },
      }),
    });
    const json = await res.json();

    if (res.status === 201) {
      dispatch(postStatusSubmitSuccess(json));
    } else {
      dispatch(postStatusSubmitFailure(json.error));
    }
  } catch (e) {
    dispatch(postStatusSubmitFailure(e));
  }
};