import {
  BoardsRequestActionTypes,
  BOARDS_REQUEST_START,
  BOARDS_REQUEST_SUCCESS,
  BOARDS_REQUEST_FAILURE,
} from '../actions/Board/requestBoards';

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
  action: BoardsRequestActionTypes,
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

    default:
      return state;
  }
}

export default boardsReducer;