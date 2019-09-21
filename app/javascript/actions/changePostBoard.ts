import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { State } from '../reducers/rootReducer';

export const CHANGE_POST_BOARD_SUCCESS = 'CHANGE_POST_BOARD_SUCCESS';
export interface ChangePostBoardSuccessAction {
  type: typeof CHANGE_POST_BOARD_SUCCESS;
  newBoardId;
}

const changePostBoardSuccess = (newBoardId: number): ChangePostBoardSuccessAction => ({
  type: CHANGE_POST_BOARD_SUCCESS,
  newBoardId,
});

export const changePostBoard = (
  postId: number,
  newBoardId: number,
  authenticityToken: string,
): ThunkAction<void, State, null, Action<string>> => async (dispatch) => {
  try {
    const response = await fetch(`/posts/${postId}`, {
      method: 'PATCH',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'X-CSRF-Token': authenticityToken,
      },
      body: JSON.stringify({
        post: {
          board_id: newBoardId,
        },
      })
    });

    if (response.status === 204) {
      dispatch(changePostBoardSuccess(newBoardId));
    }
  } catch (e) {
    console.log(e);
  }
}