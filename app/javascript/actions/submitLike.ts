import { Action } from "redux";
import { ThunkAction } from "redux-thunk";

import { State } from "../reducers/rootReducer";

export const LIKE_SUBMIT_SUCCESS = 'LIKE_SUBMIT_SUCCESS';
interface LikeSubmitSuccessAction {
  type: typeof LIKE_SUBMIT_SUCCESS,
  postId: number;
  isLike: boolean;
}

export type LikeActionTypes = LikeSubmitSuccessAction;

const likeSubmitSuccess = (postId: number, isLike: boolean): LikeSubmitSuccessAction => ({
  type: LIKE_SUBMIT_SUCCESS,
  postId,
  isLike,
});

export const submitLike = (
  postId: number,
  isLike: boolean,
  authenticityToken: string,
): ThunkAction<void, State, null, Action<string>> => async (dispatch) => {
  try {
    const res = await fetch(`/posts/${postId}/likes`, {
      method: isLike ? 'POST' : 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'X-CSRF-Token': authenticityToken,
      },
    });

    if (res.status === 201 || res.status === 202)
      dispatch(likeSubmitSuccess(postId, isLike));
  } catch (e) {
    console.log('An error occurred while liking a post');
  }
}