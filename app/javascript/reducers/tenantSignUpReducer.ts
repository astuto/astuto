import {
  TenantSubmitActionTypes,
  TENANT_SUBMIT_START,
  TENANT_SUBMIT_SUCCESS,
  TENANT_SUBMIT_FAILURE,
} from '../actions/Tenant/submitTenant';

export interface TenantSignUpState {
  isSubmitting: boolean;
  error: string;
}

const initialState: TenantSignUpState = {
  isSubmitting: false,
  error: '',
};

const tenantSignUpReducer = (
  state = initialState,
  action: TenantSubmitActionTypes,
) => {
  switch (action.type) {
    case TENANT_SUBMIT_START:
      return {
        ...state,
        isSubmitting: true,
      };

    case TENANT_SUBMIT_SUCCESS:
      return {
        ...state,
        isSubmitting: false,
        error: '',
      };

    case TENANT_SUBMIT_FAILURE:
      return {
        ...state,
        isSubmitting: false,
        error: action.error,
      };

    default:
      return state;   
  }
}

export default tenantSignUpReducer;