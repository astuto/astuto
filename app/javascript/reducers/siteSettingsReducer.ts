import {
  BoardsRequestActionTypes,
  BOARDS_REQUEST_START,
  BOARDS_REQUEST_SUCCESS,
  BOARDS_REQUEST_FAILURE,
} from '../actions/Board/requestBoards';

import {
  BoardSubmitActionTypes,
  BOARD_SUBMIT_START,
  BOARD_SUBMIT_SUCCESS,
  BOARD_SUBMIT_FAILURE,
} from '../actions/Board/submitBoard';

import {
  BoardOrderUpdateActionTypes,
  BOARD_ORDER_UPDATE_START,
  BOARD_ORDER_UPDATE_SUCCESS,
  BOARD_ORDER_UPDATE_FAILURE,
} from '../actions/Board/updateBoardOrder';

import {
  BoardUpdateActionTypes,
  BOARD_UPDATE_START,
  BOARD_UPDATE_SUCCESS,
  BOARD_UPDATE_FAILURE,
} from '../actions/Board/updateBoard';

import {
  BoardDeleteActionTypes,
  BOARD_DELETE_START,
  BOARD_DELETE_SUCCESS,
  BOARD_DELETE_FAILURE,
} from '../actions/Board/deleteBoard';

import {
  PostStatusOrderUpdateActionTypes,
  POSTSTATUS_ORDER_UPDATE_START,
  POSTSTATUS_ORDER_UPDATE_SUCCESS,
  POSTSTATUS_ORDER_UPDATE_FAILURE,
} from '../actions/PostStatus/updatePostStatusOrder';

import {
  PostStatusDeleteActionTypes,
  POST_STATUS_DELETE_START,
  POST_STATUS_DELETE_SUCCESS,
  POST_STATUS_DELETE_FAILURE,
} from '../actions/PostStatus/deletePostStatus';

import {
  PostStatusSubmitActionTypes,
  POSTSTATUS_SUBMIT_START,
  POSTSTATUS_SUBMIT_SUCCESS,
  POSTSTATUS_SUBMIT_FAILURE,
} from '../actions/PostStatus/submitPostStatus';

import {
  PostStatusUpdateActionTypes,
  POSTSTATUS_UPDATE_START,
  POSTSTATUS_UPDATE_SUCCESS,
  POSTSTATUS_UPDATE_FAILURE,
} from '../actions/PostStatus/updatePostStatus';

import {
  UsersRequestActionTypes,
  USERS_REQUEST_START,
  USERS_REQUEST_SUCCESS,
  USERS_REQUEST_FAILURE,
} from '../actions/User/requestUsers';

import {
  UserUpdateActionTypes,
  USER_UPDATE_START,
  USER_UPDATE_SUCCESS,
  USER_UPDATE_FAILURE,
} from '../actions/User/updateUser';

import siteSettingsBoardsReducer, { SiteSettingsBoardsState } from './SiteSettings/boardsReducer';
import siteSettingsPostStatusesReducer, { SiteSettingsPostStatusesState } from './SiteSettings/postStatusesReducer';
import siteSettingsRoadmapReducer, { SiteSettingsRoadmapState } from './SiteSettings/roadmapReducer';
import siteSettingsUsersReducer, { SiteSettingsUsersState } from './SiteSettings/usersReducer';

interface SiteSettingsState {
  boards: SiteSettingsBoardsState;
  postStatuses: SiteSettingsPostStatusesState;
  roadmap: SiteSettingsRoadmapState;
  users: SiteSettingsUsersState;
}

const initialState: SiteSettingsState = {
  boards: siteSettingsBoardsReducer(undefined, {} as any),
  postStatuses: siteSettingsPostStatusesReducer(undefined, {} as any),
  roadmap: siteSettingsRoadmapReducer(undefined, {} as any),
  users: siteSettingsUsersReducer(undefined, {} as any),
};

const siteSettingsReducer = (
  state = initialState,
  action:
    BoardsRequestActionTypes |
    BoardSubmitActionTypes |
    BoardUpdateActionTypes |
    BoardOrderUpdateActionTypes |
    BoardDeleteActionTypes |
    PostStatusOrderUpdateActionTypes |
    PostStatusDeleteActionTypes |
    PostStatusSubmitActionTypes |
    PostStatusUpdateActionTypes |
    UsersRequestActionTypes |
    UserUpdateActionTypes
): SiteSettingsState => {
  switch (action.type) {
    case BOARDS_REQUEST_START:
    case BOARDS_REQUEST_SUCCESS:
    case BOARDS_REQUEST_FAILURE:
    case BOARD_SUBMIT_START:
    case BOARD_SUBMIT_SUCCESS:
    case BOARD_SUBMIT_FAILURE:
    case BOARD_UPDATE_START:
    case BOARD_UPDATE_SUCCESS:
    case BOARD_UPDATE_FAILURE:
    case BOARD_ORDER_UPDATE_START:
    case BOARD_ORDER_UPDATE_SUCCESS:
    case BOARD_ORDER_UPDATE_FAILURE:
    case BOARD_DELETE_START:
    case BOARD_DELETE_SUCCESS:
    case BOARD_DELETE_FAILURE:
      return {
        ...state,
        boards: siteSettingsBoardsReducer(state.boards, action),
      };
    
    case POSTSTATUS_SUBMIT_START:
    case POSTSTATUS_SUBMIT_SUCCESS:
    case POSTSTATUS_SUBMIT_FAILURE:
    case POSTSTATUS_ORDER_UPDATE_START:
    case POSTSTATUS_ORDER_UPDATE_SUCCESS:
    case POSTSTATUS_ORDER_UPDATE_FAILURE:
    case POST_STATUS_DELETE_START:
    case POST_STATUS_DELETE_SUCCESS:
    case POST_STATUS_DELETE_FAILURE:
      return {
        ...state,
        postStatuses: siteSettingsPostStatusesReducer(state.postStatuses, action),
      };

    case POSTSTATUS_UPDATE_START:
    case POSTSTATUS_UPDATE_SUCCESS:
    case POSTSTATUS_UPDATE_FAILURE:
      return {
        ...state,
        postStatuses: siteSettingsPostStatusesReducer(state.postStatuses, action),
        roadmap: siteSettingsRoadmapReducer(state.roadmap, action),
      };

    case USERS_REQUEST_START:
    case USERS_REQUEST_SUCCESS:
    case USERS_REQUEST_FAILURE:
    case USER_UPDATE_START:
    case USER_UPDATE_SUCCESS:
    case USER_UPDATE_FAILURE:
      return {
        ...state,
        users: siteSettingsUsersReducer(state.users, action),
      };

    default:
      return state;
  }
};

export default siteSettingsReducer;