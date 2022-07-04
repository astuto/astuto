import {
  TenantRequestActionTypes,
  TENANT_REQUEST_START,
  TENANT_REQUEST_SUCCESS,
  TENANT_REQUEST_FAILURE,
} from "../../actions/Tenant/requestTenant";

export interface ISiteSettingsGeneralForm {
  siteName: string;
  siteLogo: string;
  locale: string;
}

export interface SiteSettingsGeneralState {
  form: ISiteSettingsGeneralForm,
  areDirty: boolean;
  areUpdating: boolean;
  error: string;
}

const initialState: SiteSettingsGeneralState = {
  form: {
    siteName: '',
    siteLogo: '',
    locale: '',
  },
  areDirty: false,
  areUpdating: false,
  error: '',
};

const siteSettingsGeneralReducer = (
  state = initialState,
  action: TenantRequestActionTypes
) => {
  switch (action.type) {
    case TENANT_REQUEST_START:
      return {
        ...state,
        areUpdating: true,
      };

    case TENANT_REQUEST_SUCCESS:
      return {
        ...state,
        form: {
          siteName: action.tenant.site_name,
          siteLogo: action.tenant.site_logo,
          locale: action.tenant.locale,
        },
        areDirty: false,
        areUpdating: false,
        error: '',
      };

    case TENANT_REQUEST_FAILURE:
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