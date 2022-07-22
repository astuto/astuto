import { Action } from "redux";
import { ThunkAction } from "redux-thunk";
import HttpStatus from "../../constants/http_status";
import buildRequestHeaders from "../../helpers/buildRequestHeaders";
import ITenantJSON from "../../interfaces/json/ITenant";
import { State } from "../../reducers/rootReducer";

export const TENANT_SUBMIT_START = 'TENANT_SUBMIT_START';
interface TenantSubmitStartAction {
  type: typeof TENANT_SUBMIT_START;
}

export const TENANT_SUBMIT_SUCCESS = 'TENANT_SUBMIT_SUCCESS';
interface TenantSubmitSuccessAction {
  type: typeof TENANT_SUBMIT_SUCCESS;
  tenant: ITenantJSON;
}

export const TENANT_SUBMIT_FAILURE = 'TENANT_SUBMIT_FAILURE';
interface TenantSubmitFailureAction {
  type: typeof TENANT_SUBMIT_FAILURE;
  error: string;
}

export type TenantSubmitActionTypes =
  TenantSubmitStartAction |
  TenantSubmitSuccessAction |
  TenantSubmitFailureAction;

const tenantSubmitStart = (): TenantSubmitStartAction => ({
  type: TENANT_SUBMIT_START,
});

const tenantSubmitSuccess = (
  tenantJSON: ITenantJSON,
): TenantSubmitSuccessAction => ({
  type: TENANT_SUBMIT_SUCCESS,
  tenant: tenantJSON,
});

const tenantSubmitFailure = (error: string): TenantSubmitFailureAction => ({
  type: TENANT_SUBMIT_FAILURE,
  error,
});

export const submitTenant = (
  userFullName: string,
  userEmail: string,
  userPassword: string,
  siteName: string,
  subdomain: string,
  authenticityToken: string,
): ThunkAction<void, State, null, Action<string>> => async (dispatch) => {
  dispatch(tenantSubmitStart());

  try {
    const res = await fetch(`/tenants`, {
      method: 'POST',
      headers: buildRequestHeaders(authenticityToken),
      body: JSON.stringify({
        user: {
          full_name: userFullName,
          email: userEmail,
          password: userPassword,
        },
        tenant: {
          site_name: siteName,
          subdomain: subdomain,
        },
      }),
    });
    const json = await res.json();

    if (res.status === HttpStatus.Created) {
      dispatch(tenantSubmitSuccess(json));
    } else {
      dispatch(tenantSubmitFailure(json.error));
    }

    return Promise.resolve(res);
  } catch (e) {
    dispatch(tenantSubmitFailure(e));

    return Promise.resolve(e);
  }
};