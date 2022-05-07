import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { State } from '../../reducers/rootReducer';

import buildRequestHeaders from '../../helpers/buildRequestHeaders';

export const CHANGE_POST_STATUS_SUCCESS = 'CHANGE_POST_STATUS_SUCCESS';
export interface ChangePostStatusSuccessAction {
  type: typeof CHANGE_POST_STATUS_SUCCESS;
  newPostStatusId: number;
}

const changePostStatusSuccess = (newPostStatusId: number): ChangePostStatusSuccessAction => ({
  type: CHANGE_POST_STATUS_SUCCESS,
  newPostStatusId,
});

export const changePostStatus = (
  postId: number,
  newPostStatusId: number,
  authenticityToken: string,
): ThunkAction<void, State, null, Action<string>> => async (dispatch) => {
  try {
    const response = await fetch(`/posts/${postId}`, {
      method: 'PATCH',
      headers: buildRequestHeaders(authenticityToken),
      body: JSON.stringify({
        post: {
          post_status_id: newPostStatusId,
        },
      })
    });

    if (response.status === 204) {
      dispatch(changePostStatusSuccess(newPostStatusId));
    }
  } catch (e) {
    console.log(e);
  }
}