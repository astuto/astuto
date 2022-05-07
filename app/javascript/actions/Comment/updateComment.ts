import { ThunkAction } from "redux-thunk";
import { State } from "../../reducers/rootReducer";
import { Action } from "redux";

import buildRequestHeaders from "../../helpers/buildRequestHeaders";

export const TOGGLE_COMMENT_IS_UPDATE_SUCCESS = 'TOGGLE_COMMENT_IS_UPDATE_SUCCESS';
export interface ToggleIsUpdateSuccessAction {
  type: typeof TOGGLE_COMMENT_IS_UPDATE_SUCCESS;
  commentId: number;
}

const toggleIsUpdateSuccess = (
  commentId: number,
): ToggleIsUpdateSuccessAction => ({
  type: TOGGLE_COMMENT_IS_UPDATE_SUCCESS,
  commentId,
});

export const toggleCommentIsUpdate = (
  postId: number,
  commentId: number,
  currentIsPostUpdate: boolean,
  authenticityToken: string,
): ThunkAction<void, State, null, Action<string>> => async (dispatch) => {
  try {
    const response = await fetch(`/posts/${postId}/comments/${commentId}`, {
      method: 'PATCH',
      headers: buildRequestHeaders(authenticityToken),
      body: JSON.stringify({
        comment: {
          is_post_update: !currentIsPostUpdate,
        },
      })
    });

    if (response.status === 200) {
      dispatch(toggleIsUpdateSuccess(commentId));
    }
  } catch (e) {
    console.log(e);
  }
}