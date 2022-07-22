import { connect } from "react-redux";

import TenantSignUpP from "../components/TenantSignUp/TenantSignUpP";

import { State } from "../reducers/rootReducer";
import { submitTenant } from "../actions/Tenant/submitTenant";

const mapStateToProps = (state: State) => ({
  isSubmitting: state.tenantSignUp.isSubmitting,
  error: state.tenantSignUp.error,
});

const mapDispatchToProps = (dispatch: any) => ({
  handleSubmit(
    userFullName: string,
    userEmail: string,
    userPassword: string,
    siteName: string,
    subdomain: string,
    authenticityToken: string,
  ): Promise<any> {
    return dispatch(submitTenant(
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