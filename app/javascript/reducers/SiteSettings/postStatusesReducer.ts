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
    PostStatusDeleteActionTypes
): SiteSettingsPostStatusesState => {
  switch (action.type) {
    case POSTSTATUS_ORDER_UPDATE_START:
    case POST_STATUS_DELETE_START:
      return {
        ...state,
        areUpdating: true,
      };

    case POSTSTATUS_ORDER_UPDATE_SUCCESS:
    case POST_STATUS_DELETE_SUCCESS:
      return {
        ...state,
        areUpdating: false,
        error: '',
      };

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