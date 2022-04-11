import {
  PostStatusOrderUpdateActionTypes,
  POSTSTATUS_ORDER_UPDATE_START,
  POSTSTATUS_ORDER_UPDATE_SUCCESS,
  POSTSTATUS_ORDER_UPDATE_FAILURE,
} from '../actions/updatePostStatusOrder';

interface SiteSettingsState {
  areUpdating: boolean;
  error: string;
}

const initialState: SiteSettingsState = {
  areUpdating: false,
  error: '',
};

const siteSettingsReducer = (
  state = initialState,
  action: PostStatusOrderUpdateActionTypes
): SiteSettingsState => {
  switch (action.type) {
    case POSTSTATUS_ORDER_UPDATE_START:
      return {
        ...state,
        areUpdating: true,
      };

    case POSTSTATUS_ORDER_UPDATE_SUCCESS:
      return {
        ...state,
        areUpdating: false,
        error: '',
      };

    case POSTSTATUS_ORDER_UPDATE_FAILURE:
      return {
        ...state,
        areUpdating: false,
        error: action.error,
      };

    default:
      return state;
  }
};

export default siteSettingsReducer;