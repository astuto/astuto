import { connect } from "react-redux";

import TenantSignUpP from "../components/TenantSignUp/TenantSignUpP";

import { State } from "../reducers/rootReducer";
import {
  changeUserEmailTenantSignUp,
  changeUserFullNameTenantSignUp,
  changeUserPasswordConfirmationTenantSignUp,
  changeUserPasswordTenantSignUp,
  confirmUserFormTenantSignUp,
  toggleEmailAuthTenantSignUp
} from "../actions/Tenant/tenantSignUpFormActions";

const mapStateToProps = (state: State) => ({
  currentStep: state.tenantSignUp.currentStep,
  emailAuth: state.tenantSignUp.emailAuth,
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
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TenantSignUpP);