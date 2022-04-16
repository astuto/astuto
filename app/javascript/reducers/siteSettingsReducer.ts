import {
  PostStatusOrderUpdateActionTypes,
  POSTSTATUS_ORDER_UPDATE_START,
  POSTSTATUS_ORDER_UPDATE_SUCCESS,
  POSTSTATUS_ORDER_UPDATE_FAILURE,
} from '../actions/updatePostStatusOrder';

import {
  PostStatusDeleteActionTypes,
  POST_STATUS_DELETE_START,
  POST_STATUS_DELETE_SUCCESS,
  POST_STATUS_DELETE_FAILURE,
} from '../actions/deletePostStatus';

import siteSettingsPostStatusesReducer, { SiteSettingsPostStatusesState } from './SiteSettings/postStatusesReducer';

interface SiteSettingsState {
  postStatuses: SiteSettingsPostStatusesState;
}

const initialState: SiteSettingsState = {
  postStatuses: siteSettingsPostStatusesReducer(undefined, {} as any),
};

const siteSettingsReducer = (
  state = initialState,
  action: PostStatusOrderUpdateActionTypes |
    PostStatusDeleteActionTypes
): SiteSettingsState => {
  switch (action.type) {
    case POSTSTATUS_ORDER_UPDATE_START:
    case POSTSTATUS_ORDER_UPDATE_SUCCESS:
    case POSTSTATUS_ORDER_UPDATE_FAILURE:
    case POST_STATUS_DELETE_START:
    case POST_STATUS_DELETE_SUCCESS:
    case POST_STATUS_DELETE_FAILURE:
      return {
        postStatuses: siteSettingsPostStatusesReducer(state.postStatuses, action)
      };

    default:
      return state;
  }
};

export default siteSettingsReducer;