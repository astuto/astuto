import { connect } from "react-redux";

import TenantSignUpP from "../components/TenantSignUp/TenantSignUpP";

import { State } from "../reducers/rootReducer";
import {
  changeTenantSiteNameTenantSignUp,
  changeTenantSubdomainTenantSignUp,
  changeUserEmailTenantSignUp,
  changeUserFullNameTenantSignUp,
  changeUserPasswordConfirmationTenantSignUp,
  changeUserPasswordTenantSignUp,
  confirmUserFormTenantSignUp,
  toggleEmailAuthTenantSignUp
} from "../actions/Tenant/tenantSignUpFormActions";
import { submitTenant } from "../actions/Tenant/submitTenant";

const mapStateToProps = (state: State) => ({
  currentStep: state.tenantSignUp.currentStep,
  emailAuth: state.tenantSignUp.emailAuth,
  isSubmitting: state.tenantSignUp.isSubmitting,
  error: state.tenantSignUp.error,
  userForm: state.tenantSignUp.userForm,
  tenantForm: state.tenantSignUp.tenantForm,
});

const mapDispatchToProps = (dispatch: any) => ({
  toggleEmailAuth() {
    dispatch(toggleEmailAuthTenantSignUp());
  },

  handleChangeUserFullName(fullName: string) {
    dispatch(changeUserFullNameTenantSignUp(fullName));
  },

  handleChangeUserEmail(email: string) {
    dispatch(changeUserEmailTenantSignUp(email));
  },

  handleChangeUserPassword(password: string) {
    dispatch(changeUserPasswordTenantSignUp(password));
  },

  handleChangeUserPasswordConfirmation(passwordConfirmation: string) {
    dispatch(changeUserPasswordConfirmationTenantSignUp(passwordConfirmation));
  },

  handleUserFormConfirm() {
    dispatch(confirmUserFormTenantSignUp());
  },

  handleChangeTenantSiteName(siteName: string) {
    dispatch(changeTenantSiteNameTenantSignUp(siteName));
  },

  handleChangeTenantSubdomain(subdomain: string) {
    dispatch(changeTenantSubdomainTenantSignUp(subdomain));
  },

  handleSubmit(
    userFullName: string,
    userEmail: string,
    userPassword: string,
    siteName: string,
    subdomain: string,
    authenticityToken: string,
  ) {
    dispatch(submitTenant(
      userFullName,
      userEmail,
      userPassword,
      siteName,
      subdomain,
      authenticityToken,
    ));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TenantSignUpP);