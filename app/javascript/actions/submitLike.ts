import { Action } from "redux";
import { ThunkAction } from "redux-thunk";

import { State } from "../reducers/rootReducer";
import ILikeJSON from "../interfaces/json/ILike";
import buildRequestHeaders from "../helpers/buildRequestHeaders";

export const LIKE_SUBMIT_SUCCESS = 'LIKE_SUBMIT_SUCCESS';
interface LikeSubmitSuccessAction {
  type: typeof LIKE_SUBMIT_SUCCESS,
  postId: number;
  isLike: boolean;
  like: ILikeJSON;
}

export type LikeActionTypes = LikeSubmitSuccessAction;

const likeSubmitSuccess = (
  postId: number,
  isLike: boolean,
  like: ILikeJSON,  
): LikeSubmitSuccessAction => ({
  type: LIKE_SUBMIT_SUCCESS,
  postId,
  isLike,
  like,
});

export const submitLike = (
  postId: number,
  isLike: boolean,
  authenticityToken: string,
): ThunkAction<void, State, null, Action<string>> => async (dispatch) => {
  try {
    const res = await fetch(`/posts/${postId}/likes`, {
      method: isLike ? 'POST' : 'DELETE',
      headers: buildRequestHeaders(authenticityToken),
    });
    const json = await res.json();

    if (res.status === 201 || res.status === 202)
      dispatch(likeSubmitSuccess(postId, isLike, json));
  } catch (e) {
    console.log('An error occurred while liking a post');
  }
}