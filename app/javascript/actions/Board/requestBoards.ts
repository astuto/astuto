import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';

import IBoard from '../../interfaces/IBoard';

import { State } from '../../reducers/rootReducer';

export const BOARDS_REQUEST_START = 'BOARDS_REQUEST_START';
interface BoardsRequestStartAction {
  type: typeof BOARDS_REQUEST_START;
}

export const BOARDS_REQUEST_SUCCESS = 'BOARDS_REQUEST_SUCCESS';
interface BoardsRequestSuccessAction {
  type: typeof BOARDS_REQUEST_SUCCESS;
  boards: Array<IBoard>;
}

export const BOARDS_REQUEST_FAILURE = 'BOARDS_REQUEST_FAILURE';
interface BoardsRequestFailureAction {
  type: typeof BOARDS_REQUEST_FAILURE;
  error: string;
}

export type BoardsRequestActionTypes =
  BoardsRequestStartAction |
  BoardsRequestSuccessAction |
  BoardsRequestFailureAction;


const boardsRequestStart = (): BoardsRequestActionTypes => ({
  type: BOARDS_REQUEST_START,
});

const boardsRequestSuccess = (
  boards: Array<IBoard>
): BoardsRequestActionTypes => ({
  type: BOARDS_REQUEST_SUCCESS,
  boards,
});

const boardsRequestFailure = (error: string): BoardsRequestActionTypes => ({
  type: BOARDS_REQUEST_FAILURE,
  error,
});

export const requestBoards = (): ThunkAction<void, State, null, Action<string>> => (
  async (dispatch) => {
    dispatch(boardsRequestStart());

    try {
      const response = await fetch('/boards');
      const json = await response.json();
      dispatch(boardsRequestSuccess(json));
    } catch (e) {
      dispatch(boardsRequestFailure(e));
    }
  }
)