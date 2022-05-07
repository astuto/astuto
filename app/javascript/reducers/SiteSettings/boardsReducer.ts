import {
  BoardsRequestActionTypes,
  BOARDS_REQUEST_START,
  BOARDS_REQUEST_SUCCESS,
  BOARDS_REQUEST_FAILURE,
} from '../../actions/Board/requestBoards';

import {
  BoardSubmitActionTypes,
  BOARD_SUBMIT_START,
  BOARD_SUBMIT_SUCCESS,
  BOARD_SUBMIT_FAILURE,
} from '../../actions/Board/submitBoard';

import {
  BoardOrderUpdateActionTypes,
  BOARD_ORDER_UPDATE_START,
  BOARD_ORDER_UPDATE_SUCCESS,
  BOARD_ORDER_UPDATE_FAILURE,
} from '../../actions/Board/updateBoardOrder';

export interface SiteSettingsBoardsState {
  areUpdating: boolean;
  error: string;
}

const initialState: SiteSettingsBoardsState = {
  areUpdating: false,
  error: '',
};

const siteSettingsBoardsReducer = (
  state = initialState,
  action:
    BoardsRequestActionTypes | 
    BoardSubmitActionTypes |
    BoardOrderUpdateActionTypes
): SiteSettingsBoardsState => {
  switch (action.type) {
    case BOARDS_REQUEST_START:
    case BOARD_SUBMIT_START:
    case BOARD_ORDER_UPDATE_START:
      return {
        ...state,
        areUpdating: true,
      };

    case BOARDS_REQUEST_SUCCESS:
    case BOARD_SUBMIT_SUCCESS:
    case BOARD_ORDER_UPDATE_SUCCESS:
      return {
        ...state,
        areUpdating: false,
        error: '',
      };

    case BOARDS_REQUEST_FAILURE:
    case BOARD_SUBMIT_FAILURE:
    case BOARD_ORDER_UPDATE_FAILURE:
      return {
        ...state,
        areUpdating: false,
        error: action.error,
      };

    default:
      return state;
  }
};

export default siteSettingsBoardsReducer;