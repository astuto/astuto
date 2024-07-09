import {
  TenantUpdateActionTypes,
  TENANT_UPDATE_START,
  TENANT_UPDATE_SUCCESS,
  TENANT_UPDATE_FAILURE,
} from '../actions/Tenant/updateTenant';

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
  OAuthSubmitActionTypes,
  OAUTH_SUBMIT_START,
  OAUTH_SUBMIT_SUCCESS,
  OAUTH_SUBMIT_FAILURE,
} from '../actions/OAuth/submitOAuth';

import {
  OAuthUpdateActionTypes,
  OAUTH_UPDATE_START,
  OAUTH_UPDATE_SUCCESS,
  OAUTH_UPDATE_FAILURE,
} from '../actions/OAuth/updateOAuth';

import {
  OAuthDeleteActionTypes,
  OAUTH_DELETE_START,
  OAUTH_DELETE_SUCCESS,
  OAUTH_DELETE_FAILURE,
} from '../actions/OAuth/deleteOAuth';

import siteSettingsGeneralReducer, { SiteSettingsGeneralState } from './SiteSettings/generalReducer';
import siteSettingsBoardsReducer, { SiteSettingsBoardsState } from './SiteSettings/boardsReducer';
import siteSettingsPostStatusesReducer, { SiteSettingsPostStatusesState } from './SiteSettings/postStatusesReducer';
import siteSettingsRoadmapReducer, { SiteSettingsRoadmapState } from './SiteSettings/roadmapReducer';
import siteSettingsAuthenticationReducer, { SiteSettingsAuthenticationState } from './SiteSettings/authenticationReducer';
import siteSettingsAppearanceReducer, { SiteSettingsAppearanceState } from './SiteSettings/appearanceReducer';

interface SiteSettingsState {
  general: SiteSettingsGeneralState;
  authentication: SiteSettingsAuthenticationState;
  boards: SiteSettingsBoardsState;
  postStatuses: SiteSettingsPostStatusesState;
  roadmap: SiteSettingsRoadmapState;
  appearance: SiteSettingsAppearanceState;
}

const initialState: SiteSettingsState = {
  general: siteSettingsGeneralReducer(undefined, {} as any),
  authentication: siteSettingsAuthenticationReducer(undefined, {} as any),
  boards: siteSettingsBoardsReducer(undefined, {} as any),
  postStatuses: siteSettingsPostStatusesReducer(undefined, {} as any),
  roadmap: siteSettingsRoadmapReducer(undefined, {} as any),
  appearance: siteSettingsAppearanceReducer(undefined, {} as any),
};

const siteSettingsReducer = (
  state = initialState,
  action:
    TenantUpdateActionTypes |
    OAuthSubmitActionTypes |
    OAuthUpdateActionTypes |
    OAuthDeleteActionTypes |
    BoardSubmitActionTypes |
    BoardUpdateActionTypes |
    BoardOrderUpdateActionTypes |
    BoardDeleteActionTypes |
    PostStatusOrderUpdateActionTypes |
    PostStatusDeleteActionTypes |
    PostStatusSubmitActionTypes |
    PostStatusUpdateActionTypes
): SiteSettingsState => {
  switch (action.type) {
    case TENANT_UPDATE_START:
    case TENANT_UPDATE_SUCCESS:
    case TENANT_UPDATE_FAILURE:
      return {
        ...state,
        general: siteSettingsGeneralReducer(state.general, action),
        appearance: siteSettingsAppearanceReducer(state.general, action),
      };

    case OAUTH_SUBMIT_START:
    case OAUTH_SUBMIT_SUCCESS:
    case OAUTH_SUBMIT_FAILURE:
    case OAUTH_UPDATE_START:
    case OAUTH_UPDATE_SUCCESS:
    case OAUTH_UPDATE_FAILURE:
    case OAUTH_DELETE_START:
    case OAUTH_DELETE_SUCCESS:
    case OAUTH_DELETE_FAILURE:
      return {
        ...state,
        authentication: siteSettingsAuthenticationReducer(state.authentication, action),
      };
      
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

    default:
      return state;
  }
};

export default siteSettingsReducer;