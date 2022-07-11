import {
  TenantSignUpFormActions,
  TENANT_SIGN_UP_TOGGLE_EMAIL_AUTH,
  TENANT_SIGN_UP_CHANGE_USER_FULL_NAME,
  TENANT_SIGN_UP_CHANGE_USER_EMAIL,
  TENANT_SIGN_UP_CHANGE_USER_PASSWORD,
  TENANT_SIGN_UP_CHANGE_USER_PASSWORD_CONFIRMATION,
  TENANT_SIGN_UP_CONFIRM_USER_FORM,
} from '../actions/Tenant/tenantSignUpFormActions';

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

  userForm: TenantSignUpUserFormState;
  tenantForm: TenantSignUpTenantFormState;
}

const initialState: TenantSignUpState = {
  currentStep: 1,
  emailAuth: false,

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
  action: TenantSignUpFormActions,
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

    default:
      return state;   
  }
}

export default tenantSignUpReducer;