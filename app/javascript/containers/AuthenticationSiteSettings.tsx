import { connect } from "react-redux";
import { requestOAuths } from "../actions/OAuth/requestOAuths";
import { submitOAuth } from "../actions/OAuth/submitOAuth";

import AuthenticationSiteSettingsP from "../components/SiteSettings/Authentication/AuthenticationSiteSettingsP";
import { IOAuth } from "../interfaces/IOAuth";
import { State } from "../reducers/rootReducer";

const mapStateToProps = (state: State) => ({
  oAuths: state.oAuths,

  isSubmitting: state.siteSettings.authentication.isSubmitting,
  submitError: state.siteSettings.authentication.error,
});

const mapDispatchToProps = (dispatch: any) => ({
  requestOAuths() {
    dispatch(requestOAuths());
  },

  handleSubmitOAuth(oAuth: IOAuth, authenticityToken: string): Promise<any> {
    return dispatch(submitOAuth(oAuth, authenticityToken));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AuthenticationSiteSettingsP);