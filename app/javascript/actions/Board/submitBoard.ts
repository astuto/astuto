import { Action } from "redux";
import { ThunkAction } from "redux-thunk";

import HttpStatus from "../../constants/http_status";
import buildRequestHeaders from "../../helpers/buildRequestHeaders";
import IBoardJSON from "../../interfaces/json/IBoard";
import { State } from "../../reducers/rootReducer";

export const BOARD_SUBMIT_START = 'BOARD_SUBMIT_START';
interface BoardSubmitStartAction {
  type: typeof BOARD_SUBMIT_START;
}

export const BOARD_SUBMIT_SUCCESS = 'BOARD_SUBMIT_SUCCESS';
interface BoardSubmitSuccessAction {
  type: typeof BOARD_SUBMIT_SUCCESS;
  board: IBoardJSON;
}

export const BOARD_SUBMIT_FAILURE = 'BOARD_SUBMIT_FAILURE';
interface BoardSubmitFailureAction {
  type: typeof BOARD_SUBMIT_FAILURE;
  error: string;
}

export type BoardSubmitActionTypes =
  BoardSubmitStartAction |
  BoardSubmitSuccessAction |
  BoardSubmitFailureAction;

const boardSubmitStart = (): BoardSubmitStartAction => ({
  type: BOARD_SUBMIT_START,
});

const boardSubmitSuccess = (
  boardJSON: IBoardJSON,
): BoardSubmitSuccessAction => ({
  type: BOARD_SUBMIT_SUCCESS,
  board: boardJSON,
});

const boardSubmitFailure = (error: string): BoardSubmitFailureAction => ({
  type: BOARD_SUBMIT_FAILURE,
  error,
});

export const submitBoard = (
  name: string,
  description: string,
  authenticityToken: string,
): ThunkAction<void, State, null, Action<string>> => async (dispatch) => {
  dispatch(boardSubmitStart());

  try {
    const res = await fetch(`/boards`, {
      method: 'POST',
      headers: buildRequestHeaders(authenticityToken),
      body: JSON.stringify({
        board: {
          name,
          description,
        },
      }),
    });
    const json = await res.json();

    if (res.status === HttpStatus.Created) {
      dispatch(boardSubmitSuccess(json));
    } else {
      dispatch(boardSubmitFailure(json.error));
    }

    return Promise.resolve(res);
  } catch (e) {
    dispatch(boardSubmitFailure(e));

    return Promise.resolve(null);
  }
};