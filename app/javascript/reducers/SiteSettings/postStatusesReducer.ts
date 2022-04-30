import {
  PostStatusOrderUpdateActionTypes,
  POSTSTATUS_ORDER_UPDATE_START,
  POSTSTATUS_ORDER_UPDATE_SUCCESS,
  POSTSTATUS_ORDER_UPDATE_FAILURE,
} from '../../actions/updatePostStatusOrder';

import {
  PostStatusDeleteActionTypes,
  POST_STATUS_DELETE_START,
  POST_STATUS_DELETE_SUCCESS,
  POST_STATUS_DELETE_FAILURE,
} from '../../actions/deletePostStatus';

import {
  PostStatusSubmitActionTypes,
  POSTSTATUS_SUBMIT_START,
  POSTSTATUS_SUBMIT_SUCCESS,
  POSTSTATUS_SUBMIT_FAILURE,
} from '../../actions/submitPostStatus';

import {
  PostStatusUpdateActionTypes,
  POSTSTATUS_UPDATE_START,
  POSTSTATUS_UPDATE_SUCCESS,
  POSTSTATUS_UPDATE_FAILURE,
} from '../../actions/updatePostStatus';

export interface SiteSettingsPostStatusesState {
  areUpdating: boolean;
  error: string;
}

const initialState: SiteSettingsPostStatusesState = {
  areUpdating: false,
  error: '',
};

const siteSettingsPostStatusesReducer = (
  state = initialState,
  action: PostStatusOrderUpdateActionTypes |
    PostStatusDeleteActionTypes |
    PostStatusSubmitActionTypes |
    PostStatusUpdateActionTypes
): SiteSettingsPostStatusesState => {
  switch (action.type) {
    case POSTSTATUS_SUBMIT_START:
    case POSTSTATUS_UPDATE_START:
    case POSTSTATUS_ORDER_UPDATE_START:
    case POST_STATUS_DELETE_START:
      return {
        ...state,
        areUpdating: true,
      };

    case POSTSTATUS_SUBMIT_SUCCESS:
    case POSTSTATUS_UPDATE_SUCCESS:
    case POSTSTATUS_ORDER_UPDATE_SUCCESS:
    case POST_STATUS_DELETE_SUCCESS:
      return {
        ...state,
        areUpdating: false,
        error: '',
      };

    case POSTSTATUS_SUBMIT_FAILURE:
    case POSTSTATUS_UPDATE_FAILURE:
    case POSTSTATUS_ORDER_UPDATE_FAILURE:
    case POST_STATUS_DELETE_FAILURE:
      return {
        ...state,
        areUpdating: false,
        error: action.error,
      };

    default:
      return state;
  }
};

export default siteSettingsPostStatusesReducer;