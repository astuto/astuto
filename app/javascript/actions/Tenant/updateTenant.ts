import { Action } from "redux";
import { ThunkAction } from "redux-thunk";

import HttpStatus from "../../constants/http_status";
import buildRequestHeaders from "../../helpers/buildRequestHeaders";
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
  siteLogo?: string;
  brandDisplaySetting?: string;
  locale?: string;
  authenticityToken: string;
}

export const updateTenant = ({
  siteName = null,
  siteLogo = null,
  brandDisplaySetting = null,
  locale = null,
  authenticityToken,
}: UpdateTenantParams): ThunkAction<void, State, null, Action<string>> => async (dispatch) => {
  dispatch(tenantUpdateStart());

  const tenant = Object.assign({},
    siteName !== null ? { site_name: siteName } : null,
    siteLogo !== null ? { site_logo: siteLogo } : null,
    locale !== null ? { locale } : null
  );
  
  const tenantSetting = Object.assign({},
    brandDisplaySetting !== null ? { brand_display: brandDisplaySetting } : null,
  );

  try {
    const body = JSON.stringify({
      tenant: {
        ...tenant,
        tenant_setting: tenantSetting,
      },
    });

    console.log(body)

    const res = await fetch(`/tenants/0`, {
      method: 'PATCH',
      headers: buildRequestHeaders(authenticityToken),
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