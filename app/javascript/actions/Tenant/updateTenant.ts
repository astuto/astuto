import { Action } from "redux";
import { ThunkAction } from "redux-thunk";

import HttpStatus from "../../constants/http_status";
import buildRequestHeaders from "../../helpers/buildRequestHeaders";
import ITenantSetting from "../../interfaces/ITenantSetting";
import ITenantJSON from "../../interfaces/json/ITenant";
import { State } from "../../reducers/rootReducer";

export const TENANT_UPDATE_START = 'TENANT_UPDATE_START';
interface TenantUpdateStartAction {
  type: typeof TENANT_UPDATE_START;
}

export const TENANT_UPDATE_SUCCESS = 'TENANT_UPDATE_SUCCESS';
interface TenantUpdateSuccessAction {
  type: typeof TENANT_UPDATE_SUCCESS;
  tenant: ITenantJSON;
}

export const TENANT_UPDATE_FAILURE = 'TENANT_UPDATE_FAILURE';
interface TenantUpdateFailureAction {
  type: typeof TENANT_UPDATE_FAILURE;
  error: string;
}

export type TenantUpdateActionTypes =
  TenantUpdateStartAction |
  TenantUpdateSuccessAction |
  TenantUpdateFailureAction;

const tenantUpdateStart = (): TenantUpdateStartAction => ({
  type: TENANT_UPDATE_START,
});

const tenantUpdateSuccess = (
  tenantJSON: ITenantJSON,
): TenantUpdateSuccessAction => ({
  type: TENANT_UPDATE_SUCCESS,
  tenant: tenantJSON,
});

const tenantUpdateFailure = (error: string): TenantUpdateFailureAction => ({
  type: TENANT_UPDATE_FAILURE,
  error,
});

interface UpdateTenantParams {
  siteName?: string;
  siteLogo?: File;
  oldSiteLogo?: string;
  tenantSetting?: ITenantSetting;
  locale?: string;
  customDomain?: string;
  authenticityToken: string;
}

export const updateTenant = ({
  siteName = null,
  siteLogo = null,
  oldSiteLogo = null,
  tenantSetting = null,
  locale = null,
  customDomain = null,
  authenticityToken,
}: UpdateTenantParams): ThunkAction<void, State, null, Action<string>> => async (dispatch) => {
  dispatch(tenantUpdateStart());

  try {
    const body = new FormData();
    
    if (siteName)
      body.append('tenant[site_name]', siteName);
    if (siteLogo)
      body.append('tenant[site_logo]', siteLogo);
    if (oldSiteLogo)
      body.append('tenant[old_site_logo]', oldSiteLogo);
    if (locale)
      body.append('tenant[locale]', locale);
    if (customDomain)
      body.append('tenant[custom_domain]', customDomain);
    
    Object.entries(tenantSetting).forEach(([key, value]) => {
      body.append(`tenant[tenant_setting_attributes][${key}]`, value);
    });

    // body.forEach((value, key) => {
    //   console.log(key, value);
    // });

    const res = await fetch(`/tenants/0`, {
      method: 'PATCH',
      headers: {
        'X-CSRF-Token': authenticityToken,
        // do not set Content-Type header when using FormData
      },
      body,
    });
    const json = await res.json();

    if (res.status === HttpStatus.OK) {
      dispatch(tenantUpdateSuccess(json));
    } else {
      dispatch(tenantUpdateFailure(json.error));
    }

    return Promise.resolve(res);
  } catch (e) {
    dispatch(tenantUpdateFailure(e));
    
    return Promise.resolve(null);
  }
};