import { Action } from "redux";
import { ThunkAction } from "redux-thunk";

import HttpStatus from "../../constants/http_status";
import buildRequestHeaders from "../../helpers/buildRequestHeaders";
import createNewOrdering from "../../helpers/createNewOrdering";
import IBoard from "../../interfaces/IBoard";

import { State } from "../../reducers/rootReducer";

export const BOARD_ORDER_UPDATE_START = 'BOARD_ORDER_UPDATE_START';
interface BoardOrderUpdateStartAction {
  type: typeof BOARD_ORDER_UPDATE_START;
  newOrder: Array<IBoard>;
}

export const BOARD_ORDER_UPDATE_SUCCESS = 'BOARD_ORDER_UPDATE_SUCCESS';
interface BoardOrderUpdateSuccessAction {
  type: typeof BOARD_ORDER_UPDATE_SUCCESS;
}

export const BOARD_ORDER_UPDATE_FAILURE = 'BOARD_ORDER_UPDATE_FAILURE';
interface BoardOrderUpdateFailureAction {
  type: typeof BOARD_ORDER_UPDATE_FAILURE;
  error: string;
  oldOrder: Array<IBoard>;
}

export type BoardOrderUpdateActionTypes =
  BoardOrderUpdateStartAction |
  BoardOrderUpdateSuccessAction |
  BoardOrderUpdateFailureAction;

const boardOrderUpdateStart = (
  newOrder: Array<IBoard>
): BoardOrderUpdateStartAction => ({
  type: BOARD_ORDER_UPDATE_START,
  newOrder,
});

const boardOrderUpdateSuccess = (): BoardOrderUpdateSuccessAction => ({
  type: BOARD_ORDER_UPDATE_SUCCESS,
});

const boardOrderUpdateFailure = (
  error: string,
  oldOrder: Array<IBoard>
): BoardOrderUpdateFailureAction => ({
  type: BOARD_ORDER_UPDATE_FAILURE,
  error,
  oldOrder,
});

export const updateBoardOrder = (
  id: number,
  boards: Array<IBoard>,
  sourceIndex: number,
  destinationIndex: number,

  authenticityToken: string,
): ThunkAction<void, State, null, Action<string>> => async (dispatch) => {
  const oldOrder = boards;
  let newOrder = createNewOrdering(boards, sourceIndex, destinationIndex);

  dispatch(boardOrderUpdateStart(newOrder));

  try {
    const res = await fetch(`/boards/update_order`, {
      method: 'PATCH',
      headers: buildRequestHeaders(authenticityToken),
      body: JSON.stringify({
        board: {
          id: id,
          src_index: sourceIndex,
          dst_index: destinationIndex,
        },
      }),
    });
    const json = await res.json();

    if (res.status === HttpStatus.OK) {
      dispatch(boardOrderUpdateSuccess());
    } else {
      dispatch(boardOrderUpdateFailure(json.error, oldOrder));
    }
  } catch (e) {
    dispatch(boardOrderUpdateFailure(e, oldOrder));
  }
};
