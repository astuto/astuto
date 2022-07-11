export const TENANT_SIGN_UP_TOGGLE_EMAIL_AUTH = 'TENANT_SIGN_UP_TOGGLE_EMAIL_AUTH';

interface TenantSignUpToggleEmailAuth {
  type: typeof TENANT_SIGN_UP_TOGGLE_EMAIL_AUTH,
}

export const toggleEmailAuthTenantSignUp = (

): TenantSignUpToggleEmailAuth => ({
  type: TENANT_SIGN_UP_TOGGLE_EMAIL_AUTH,
});


// User full name
export const TENANT_SIGN_UP_CHANGE_USER_FULL_NAME = 'TENANT_SIGN_UP_CHANGE_USER_FULL_NAME';

interface TenantSignUpChangeUserFullName {
  type: typeof TENANT_SIGN_UP_CHANGE_USER_FULL_NAME,
  fullName: string,
}

export const changeUserFullNameTenantSignUp = (
  fullName: string
): TenantSignUpChangeUserFullName => ({
  type: TENANT_SIGN_UP_CHANGE_USER_FULL_NAME,
  fullName,
});

// User email
export const TENANT_SIGN_UP_CHANGE_USER_EMAIL = 'TENANT_SIGN_UP_CHANGE_USER_EMAIL';

interface TenantSignUpChangeUserEmail {
  type: typeof TENANT_SIGN_UP_CHANGE_USER_EMAIL,
  email: string,
}

export const changeUserEmailTenantSignUp = (
  email: string
): TenantSignUpChangeUserEmail => ({
  type: TENANT_SIGN_UP_CHANGE_USER_EMAIL,
  email,
});

// User password
export const TENANT_SIGN_UP_CHANGE_USER_PASSWORD = 'TENANT_SIGN_UP_CHANGE_USER_PASSWORD';

interface TenantSignUpChangeUserPassword {
  type: typeof TENANT_SIGN_UP_CHANGE_USER_PASSWORD,
  password: string,
}

export const changeUserPasswordTenantSignUp = (
  password: string
): TenantSignUpChangeUserPassword => ({
  type: TENANT_SIGN_UP_CHANGE_USER_PASSWORD,
  password,
});

// User password confirmation
export const TENANT_SIGN_UP_CHANGE_USER_PASSWORD_CONFIRMATION = 'TENANT_SIGN_UP_CHANGE_USER_PASSWORD_CONFIRMATION';

interface TenantSignUpChangeUserPasswordConfirmation {
  type: typeof TENANT_SIGN_UP_CHANGE_USER_PASSWORD_CONFIRMATION,
  passwordConfirmation: string,
}

export const changeUserPasswordConfirmationTenantSignUp = (
  passwordConfirmation: string
): TenantSignUpChangeUserPasswordConfirmation => ({
  type: TENANT_SIGN_UP_CHANGE_USER_PASSWORD_CONFIRMATION,
  passwordConfirmation,
});

// Confirm user data, proceed to step 2
export const TENANT_SIGN_UP_CONFIRM_USER_FORM = 'TENANT_SIGN_UP_CONFIRM_USER_FORM';

interface TenantSignUpConfirmUserForm {
  type: typeof TENANT_SIGN_UP_CONFIRM_USER_FORM;
}

export const confirmUserFormTenantSignUp = (): TenantSignUpConfirmUserForm => ({
  type: TENANT_SIGN_UP_CONFIRM_USER_FORM,
});


export type TenantSignUpFormActions =
  TenantSignUpToggleEmailAuth |
  TenantSignUpChangeUserFullName |
  TenantSignUpChangeUserEmail |
  TenantSignUpChangeUserPassword |
  TenantSignUpChangeUserPasswordConfirmation |
  TenantSignUpConfirmUserForm;