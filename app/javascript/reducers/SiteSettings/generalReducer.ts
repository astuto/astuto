import {
  TenantRequestActionTypes,
  TENANT_REQUEST_START,
  TENANT_REQUEST_SUCCESS,
  TENANT_REQUEST_FAILURE,
} from "../../actions/Tenant/requestTenant";

import {
  TenantUpdateActionTypes,
  TENANT_UPDATE_START,
  TENANT_UPDATE_SUCCESS,
  TENANT_UPDATE_FAILURE,
} from '../../actions/Tenant/updateTenant';

import {
  ChangeSiteSettingsGeneralFormActionTypes,
  SITE_SETTINGS_CHANGE_GENERAL_FORM_SITE_NAME,
  SITE_SETTINGS_CHANGE_GENERAL_FORM_SITE_LOGO,
  SITE_SETTINGS_CHANGE_GENERAL_FORM_BRAND_SETTING,
  SITE_SETTINGS_CHANGE_GENERAL_FORM_LOCALE,
} from '../../actions/changeSiteSettingsGeneralForm';

export interface ISiteSettingsGeneralForm {
  siteName: string;
  siteLogo: string;
  brandDisplaySetting: string;
  locale: string;
}

export interface SiteSettingsGeneralState {
  form: ISiteSettingsGeneralForm,
  areDirty: boolean;
  areLoading: boolean;
  areUpdating: boolean;
  error: string;
}

const initialState: SiteSettingsGeneralState = {
  form: {
    siteName: '',
    siteLogo: '',
    brandDisplaySetting: '',
    locale: '',
  },
  areDirty: false,
  areLoading: false,
  areUpdating: false,
  error: '',
};

const siteSettingsGeneralReducer = (
  state = initialState,
  action:
    TenantRequestActionTypes |
    TenantUpdateActionTypes |
    ChangeSiteSettingsGeneralFormActionTypes
) => {
  switch (action.type) {
    case TENANT_REQUEST_START:
      return {
        ...state,
        areLoading: true,
      };

    case TENANT_UPDATE_START:
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
          brandDisplaySetting: action.tenant.brand_display_setting,
          locale: action.tenant.locale,
        },
        areDirty: false,
        areLoading: false,
        error: '',
      };

    case TENANT_UPDATE_SUCCESS:
      return {
        ...state,
        areDirty: false,
        areUpdating: false,
        error: '',
      };

    case TENANT_REQUEST_FAILURE:
      return {
        ...state,
        areLoading: false,
        error: action.error,
      };

    case TENANT_UPDATE_FAILURE:
      return {
        ...state,
        areUpdating: false,
        error: action.error,
      };

    case SITE_SETTINGS_CHANGE_GENERAL_FORM_SITE_NAME:
      return {
        ...state,
        form: { ...state.form, siteName: action.siteName },
        areDirty: true,
      };

    case SITE_SETTINGS_CHANGE_GENERAL_FORM_SITE_LOGO:
      return {
        ...state,
        form: { ...state.form, siteLogo: action.siteLogo },
        areDirty: true,
      };

    case SITE_SETTINGS_CHANGE_GENERAL_FORM_BRAND_SETTING:
      return {
        ...state,
        form: { ...state.form, brandDisplaySetting: action.brandDisplaySetting },
        areDirty: true,
      };

    case SITE_SETTINGS_CHANGE_GENERAL_FORM_LOCALE:
      return {
        ...state,
        form: { ...state.form, locale: action.locale },
        areDirty: true,
      };
    
    default:
      return state;
  }
}

export default siteSettingsGeneralReducer;