import {
  TenantSignUpFormActions,
  TENANT_SIGN_UP_TOGGLE_EMAIL_AUTH,
  TENANT_SIGN_UP_CHANGE_USER_FULL_NAME,
  TENANT_SIGN_UP_CHANGE_USER_EMAIL,
  TENANT_SIGN_UP_CHANGE_USER_PASSWORD,
  TENANT_SIGN_UP_CHANGE_USER_PASSWORD_CONFIRMATION,
  TENANT_SIGN_UP_CONFIRM_USER_FORM,
  TENANT_SIGN_UP_CHANGE_TENANT_SITE_NAME,
  TENANT_SIGN_UP_CHANGE_TENANT_SUBDOMAIN,
} from '../actions/Tenant/tenantSignUpFormActions';

import {
  TenantSubmitActionTypes,
  TENANT_SUBMIT_START,
  TENANT_SUBMIT_SUCCESS,
  TENANT_SUBMIT_FAILURE,
} from '../actions/Tenant/submitTenant';

export interface TenantSignUpUserFormState {
  fullName: string;
  email: string;
  password: string;
  passwordConfirmation: string;
  passwordConfirmationError: boolean;
}

export interface TenantSignUpTenantFormState {
  siteName: string;
  subdomain: string;
}

export interface TenantSignUpState {
  currentStep: number;
  emailAuth: boolean;
  isSubmitting: boolean;
  error: string;

  userForm: TenantSignUpUserFormState;
  tenantForm: TenantSignUpTenantFormState;
}

const initialState: TenantSignUpState = {
  currentStep: 1,
  emailAuth: false,
  isSubmitting: false,
  error: '',

  userForm: {
    fullName: '',
    email: '',
    password: '',
    passwordConfirmation: '',
    passwordConfirmationError: false,
  },
  tenantForm: {
    siteName: '',
    subdomain: '',
  },
};

const tenantSignUpReducer = (
  state = initialState,
  action: TenantSignUpFormActions | TenantSubmitActionTypes,
) => {
  switch (action.type) {
    case TENANT_SIGN_UP_TOGGLE_EMAIL_AUTH:
      return {
        ...state,
        emailAuth: !state.emailAuth,
      };

    case TENANT_SIGN_UP_CHANGE_USER_FULL_NAME:
      return {
        ...state,
        userForm: { ...state.userForm, fullName: action.fullName },
      };

    case TENANT_SIGN_UP_CHANGE_USER_EMAIL:
      return {
        ...state,
        userForm: { ...state.userForm, email: action.email },
      };

    case TENANT_SIGN_UP_CHANGE_USER_PASSWORD:
      return {
        ...state,
        userForm: { ...state.userForm, password: action.password },
      };

    case TENANT_SIGN_UP_CHANGE_USER_PASSWORD_CONFIRMATION:
      return {
        ...state,
        userForm: {
          ...state.userForm,
          passwordConfirmation: action.passwordConfirmation,
          passwordConfirmationError: state.userForm.password !== action.passwordConfirmation,
        },
      };

    case TENANT_SIGN_UP_CONFIRM_USER_FORM:
      return {
        ...state,
        currentStep: 2,
      };

    case TENANT_SIGN_UP_CHANGE_TENANT_SITE_NAME:
      return {
        ...state,
        tenantForm: { ...state.tenantForm, siteName: action.siteName },
      };

    case TENANT_SIGN_UP_CHANGE_TENANT_SUBDOMAIN:
      return {
        ...state,
        tenantForm: { ...state.tenantForm, subdomain: action.subdomain },
      };

    case TENANT_SUBMIT_START:
      return {
        ...state,
        isSubmitting: true,
      };

    case TENANT_SUBMIT_SUCCESS:
      return {
        ...state,
        currentStep: 3,
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