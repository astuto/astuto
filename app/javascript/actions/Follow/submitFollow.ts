import { Action } from "redux";
import { ThunkAction } from "redux-thunk";

import { State } from "../../reducers/rootReducer";
import buildRequestHeaders from "../../helpers/buildRequestHeaders";
import HttpStatus from "../../constants/http_status";
import IFollowJSON from "../../interfaces/json/IFollow";

export const FOLLOW_SUBMIT_SUCCESS = 'FOLLOW_SUBMIT_SUCCESS';
interface FollowSubmitSuccessAction {
  type: typeof FOLLOW_SUBMIT_SUCCESS,
  postId: number;
  isFollow: boolean;
  follow: IFollowJSON;
}

export type FollowActionTypes = FollowSubmitSuccessAction;

const followSubmitSuccess = (
  postId: number,
  isFollow: boolean,
  follow: IFollowJSON,  
): FollowSubmitSuccessAction => ({
  type: FOLLOW_SUBMIT_SUCCESS,
  postId,
  isFollow,
  follow,
});

export const submitFollow = (
  postId: number,
  isFollow: boolean,
  authenticityToken: string,
): ThunkAction<void, State, null, Action<string>> => async (dispatch) => {
  try {
    const res = await fetch(`/posts/${postId}/follows`, {
      method: isFollow ? 'POST' : 'DELETE',
      headers: buildRequestHeaders(authenticityToken),
    });
    const json = await res.json();

    if (res.status === HttpStatus.Created || res.status === HttpStatus.Accepted)
      dispatch(followSubmitSuccess(postId, isFollow, json));
  } catch (e) {
    console.log('An error occurred while following a post');
  }
}