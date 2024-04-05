import { Action } from "redux";
import { ThunkAction } from "redux-thunk";

import HttpStatus from "../../constants/http_status";
import buildRequestHeaders from "../../helpers/buildRequestHeaders";
import IBoardJSON from "../../interfaces/json/IBoard";
import { State } from "../../reducers/rootReducer";

export const BOARD_UPDATE_START = 'BOARD_UPDATE_START';
interface BoardUpdateStartAction {
  type: typeof BOARD_UPDATE_START;
}

export const BOARD_UPDATE_SUCCESS = 'BOARD_UPDATE_SUCCESS';
interface BoardUpdateSuccessAction {
  type: typeof BOARD_UPDATE_SUCCESS;
  board: IBoardJSON;
}

export const BOARD_UPDATE_FAILURE = 'BOARD_UPDATE_FAILURE';
interface BoardUpdateFailureAction {
  type: typeof BOARD_UPDATE_FAILURE;
  error: string;
}

export type BoardUpdateActionTypes =
  BoardUpdateStartAction |
  BoardUpdateSuccessAction |
  BoardUpdateFailureAction;

const boardUpdateStart = (): BoardUpdateStartAction => ({
  type: BOARD_UPDATE_START,
});

const boardUpdateSuccess = (
  boardJSON: IBoardJSON,
): BoardUpdateSuccessAction => ({
  type: BOARD_UPDATE_SUCCESS,
  board: boardJSON,
});

const boardUpdateFailure = (error: string): BoardUpdateFailureAction => ({
  type: BOARD_UPDATE_FAILURE,
  error,
});

export const updateBoard = (
  id: number,
  name: string,
  description: string,
  slug: string,
  authenticityToken: string,
): ThunkAction<void, State, null, Action<string>> => async (dispatch) => {
  dispatch(boardUpdateStart());

  try {
    const res = await fetch(`/boards/${id}`, {
      method: 'PATCH',
      headers: buildRequestHeaders(authenticityToken),
      body: JSON.stringify({
        board: {
          name,
          description,
          slug,
        },
      }),
    });
    const json = await res.json();

    if (res.status === HttpStatus.OK) {
      dispatch(boardUpdateSuccess(json));
    } else {
      dispatch(boardUpdateFailure(json.error));
    }

    return Promise.resolve(res);
  } catch (e) {
    dispatch(boardUpdateFailure(e));
    
    return Promise.resolve(null);
  }
};