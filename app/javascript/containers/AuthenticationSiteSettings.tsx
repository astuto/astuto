import { connect } from "react-redux";
import { submitOAuth } from "../actions/OAuth/submitOAuth";

import AuthenticationSiteSettingsP from "../components/SiteSettings/Authentication/AuthenticationSiteSettingsP";
import IOAuth from "../interfaces/IOAuth";
import { State } from "../reducers/rootReducer";

const mapStateToProps = (state: State) => ({
  isSubmitting: state.siteSettings.authentication.isSubmitting,
  submitError: state.siteSettings.authentication.error,
});

const mapDispatchToProps = (dispatch: any) => ({
  handleSubmitOAuth(oAuth: IOAuth, authenticityToken: string): Promise<any> {
    return dispatch(submitOAuth(oAuth, authenticityToken));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AuthenticationSiteSettingsP);