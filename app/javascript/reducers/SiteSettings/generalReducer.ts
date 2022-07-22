import {
  TenantUpdateActionTypes,
  TENANT_UPDATE_START,
  TENANT_UPDATE_SUCCESS,
  TENANT_UPDATE_FAILURE,
} from '../../actions/Tenant/updateTenant';


export interface SiteSettingsGeneralState {
  areUpdating: boolean;
  error: string;
}

const initialState: SiteSettingsGeneralState = {
  areUpdating: false,
  error: '',
};

const siteSettingsGeneralReducer = (
  state = initialState,
  action:
    TenantUpdateActionTypes
) => {
  switch (action.type) {
    case TENANT_UPDATE_START:
      return {
        ...state,
        areUpdating: true,
      };

    case TENANT_UPDATE_SUCCESS:
      return {
        ...state,
        areUpdating: false,
        error: '',
      };

    case TENANT_UPDATE_FAILURE:
      return {
        ...state,
        areUpdating: false,
        error: action.error,
      };
    
    default:
      return state;
  }
}

export default siteSettingsGeneralReducer;