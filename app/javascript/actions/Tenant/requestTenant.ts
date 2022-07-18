import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';

import ITenantJSON from '../../interfaces/json/ITenant';
import { State } from '../../reducers/rootReducer';

export const TENANT_REQUEST_START = 'TENANT_REQUEST_START';
interface TenantRequestStartAction {
  type: typeof TENANT_REQUEST_START;
}

export const TENANT_REQUEST_SUCCESS = 'TENANT_REQUEST_SUCCESS';
interface TenantRequestSuccessAction {
  type: typeof TENANT_REQUEST_SUCCESS;
  tenant: ITenantJSON;
}

export const TENANT_REQUEST_FAILURE = 'TENANT_REQUEST_FAILURE';
interface TenantRequestFailureAction {
  type: typeof TENANT_REQUEST_FAILURE;
  error: string;
}

export type TenantRequestActionTypes =
  TenantRequestStartAction |
  TenantRequestSuccessAction |
  TenantRequestFailureAction;


const tenantRequestStart = (): TenantRequestActionTypes => ({
  type: TENANT_REQUEST_START,
});

const tenantRequestSuccess = (
  tenant: ITenantJSON
): TenantRequestActionTypes => ({
  type: TENANT_REQUEST_SUCCESS,
  tenant,
});

const tenantRequestFailure = (error: string): TenantRequestActionTypes => ({
  type: TENANT_REQUEST_FAILURE,
  error,
});

export const requestTenant = (): ThunkAction<void, State, null, Action<string>> => (
  async (dispatch) => {
    dispatch(tenantRequestStart());

    try {
      const response = await fetch('/tenants/0');
      const json = await response.json();
      
      dispatch(tenantRequestSuccess(json));
    } catch (e) {
      dispatch(tenantRequestFailure(e));
    }
  }
);