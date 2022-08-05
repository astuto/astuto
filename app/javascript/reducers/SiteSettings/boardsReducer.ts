import {
  BoardSubmitActionTypes,
  BOARD_SUBMIT_START,
  BOARD_SUBMIT_SUCCESS,
  BOARD_SUBMIT_FAILURE,
} from '../../actions/Board/submitBoard';

import {
  BoardUpdateActionTypes,
  BOARD_UPDATE_START,
  BOARD_UPDATE_SUCCESS,
  BOARD_UPDATE_FAILURE,
} from '../../actions/Board/updateBoard';

import {
  BoardOrderUpdateActionTypes,
  BOARD_ORDER_UPDATE_START,
  BOARD_ORDER_UPDATE_SUCCESS,
  BOARD_ORDER_UPDATE_FAILURE,
} from '../../actions/Board/updateBoardOrder';

import {
  BoardDeleteActionTypes,
  BOARD_DELETE_START,
  BOARD_DELETE_SUCCESS,
  BOARD_DELETE_FAILURE,
} from '../../actions/Board/deleteBoard';

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
    BoardSubmitActionTypes |
    BoardUpdateActionTypes |
    BoardOrderUpdateActionTypes |
    BoardDeleteActionTypes
): SiteSettingsBoardsState => {
  switch (action.type) {
    case BOARD_SUBMIT_START:
    case BOARD_UPDATE_START:
    case BOARD_ORDER_UPDATE_START:
    case BOARD_DELETE_START:
      return {
        ...state,
        areUpdating: true,
      };

    case BOARD_SUBMIT_SUCCESS:
    case BOARD_UPDATE_SUCCESS:
    case BOARD_ORDER_UPDATE_SUCCESS:
    case BOARD_DELETE_SUCCESS:
      return {
        ...state,
        areUpdating: false,
        error: '',
      };

    case BOARD_SUBMIT_FAILURE:
    case BOARD_UPDATE_FAILURE:
    case BOARD_ORDER_UPDATE_FAILURE:
    case BOARD_DELETE_FAILURE:
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