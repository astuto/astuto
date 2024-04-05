import { Action } from "redux";
import { ThunkAction } from "redux-thunk";
import HttpStatus from "../../constants/http_status";

import buildRequestHeaders from "../../helpers/buildRequestHeaders";
import { State } from "../../reducers/rootReducer";

export const BOARD_DELETE_START = 'BOARD_DELETE_START';
interface BoardDeleteStartAction {
  type: typeof BOARD_DELETE_START;
}

export const BOARD_DELETE_SUCCESS = 'BOARD_DELETE_SUCCESS';
interface BoardDeleteSuccessAction {
  type: typeof BOARD_DELETE_SUCCESS;
  id: number;
}

export const BOARD_DELETE_FAILURE = 'BOARD_DELETE_FAILURE';
interface BoardDeleteFailureAction {
  type: typeof BOARD_DELETE_FAILURE;
  error: string;
}

export type BoardDeleteActionTypes =
  BoardDeleteStartAction |
  BoardDeleteSuccessAction |
  BoardDeleteFailureAction;

const boardDeleteStart = (): BoardDeleteStartAction => ({
  type: BOARD_DELETE_START,
});

const boardDeleteSuccess = (
  id: number,
): BoardDeleteSuccessAction => ({
  type: BOARD_DELETE_SUCCESS,
  id,
});

const boardDeleteFailure = (error: string): BoardDeleteFailureAction => ({
  type: BOARD_DELETE_FAILURE,
  error,
});

export const deleteBoard = (
  id: number,
  authenticityToken: string,
): ThunkAction<void, State, null, Action<string>> => (
  async (dispatch) => {
    dispatch(boardDeleteStart());

    try {
      const res = await fetch(`/boards/${id}`, {
        method: 'DELETE',
        headers: buildRequestHeaders(authenticityToken),
      });
      const json = await res.json();

      if (res.status === HttpStatus.Accepted) {
        dispatch(boardDeleteSuccess(id));
      } else {
        dispatch(boardDeleteFailure(json.error));
      }

      return Promise.resolve(res);
    } catch (e) {
      dispatch(boardDeleteFailure(e));

      return Promise.resolve(null);
    }
  }
);