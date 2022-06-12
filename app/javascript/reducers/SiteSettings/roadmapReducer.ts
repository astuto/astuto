import {
  PostStatusUpdateActionTypes,
  POSTSTATUS_UPDATE_START,
  POSTSTATUS_UPDATE_SUCCESS,
  POSTSTATUS_UPDATE_FAILURE,
} from '../../actions/PostStatus/updatePostStatus';

export interface SiteSettingsRoadmapState {
  areUpdating: boolean;
  error: string;
}

const initialState = {
  areUpdating: false,
  error: '',
};

const siteSettingsRoadmapReducer = (
  state = initialState,
  action: PostStatusUpdateActionTypes,
): SiteSettingsRoadmapState => {
  switch (action.type) {
    case POSTSTATUS_UPDATE_START:
      return {
        ...state,
        areUpdating: true,
      };

    case POSTSTATUS_UPDATE_SUCCESS:
      return {
        ...state,
        areUpdating: false,
        error: '',
      };

    case POSTSTATUS_UPDATE_FAILURE:
      return {
        ...state,
        areUpdating: false,
        error: action.error,
      };

    default:
      return state;
  }
}

export default siteSettingsRoadmapReducer;