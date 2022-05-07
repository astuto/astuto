import {
  BoardsRequestActionTypes,
  BOARDS_REQUEST_START,
  BOARDS_REQUEST_SUCCESS,
  BOARDS_REQUEST_FAILURE,
} from '../actions/Board/requestBoards';

import {
  BoardSubmitActionTypes,
  BOARD_SUBMIT_SUCCESS,
} from '../actions/Board/submitBoard';

import {
  BoardOrderUpdateActionTypes,
  BOARD_ORDER_UPDATE_START,
  BOARD_ORDER_UPDATE_FAILURE,
} from '../actions/Board/updateBoardOrder';

import IBoard from "../interfaces/IBoard";

export interface BoardsState {
  items: Array<IBoard>;
  areLoading: boolean;
  error: string;
}

const initialState: BoardsState = {
  items: [],
  areLoading: false,
  error: '',
}

const boardsReducer = (
  state = initialState,
  action:
    BoardsRequestActionTypes |
    BoardSubmitActionTypes |
    BoardOrderUpdateActionTypes
) => {
  switch (action.type) {
    case BOARDS_REQUEST_START:
      return {
        ...state,
        areLoading: true,
      };

    case BOARDS_REQUEST_SUCCESS:
      return {
        ...state,
        items: action.boards.map(board => ({
          id: board.id,
          name: board.name,
          description: board.description,
        })),
        areLoading: false,
        error: '',
      };

    case BOARDS_REQUEST_FAILURE:
      return {
        ...state,
        areLoading: false,
        error: action.error,
      };

    case BOARD_SUBMIT_SUCCESS:
      return {
        ...state,
        items: [...state.items, action.board],
      };

    case BOARD_ORDER_UPDATE_START:
      return {
        ...state,
        items: action.newOrder,
      };

    case BOARD_ORDER_UPDATE_FAILURE:
      return {
        ...state,
        items: action.oldOrder,
      };

    default:
      return state;
  }
}

export default boardsReducer;