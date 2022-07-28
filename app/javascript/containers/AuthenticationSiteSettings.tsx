import { connect } from "react-redux";
import { requestOAuths } from "../actions/OAuth/requestOAuths";
import { submitOAuth } from "../actions/OAuth/submitOAuth";
import { updateOAuth } from "../actions/OAuth/updateOAuth";

import AuthenticationSiteSettingsP from "../components/SiteSettings/Authentication/AuthenticationSiteSettingsP";
import { ISiteSettingsOAuthForm } from "../components/SiteSettings/Authentication/OAuthForm";
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

  onSubmitOAuth(oAuth: IOAuth, authenticityToken: string): Promise<any> {
    return dispatch(submitOAuth(oAuth, authenticityToken));
  },

  onUpdateOAuth(id: number, form: ISiteSettingsOAuthForm, authenticityToken: string): Promise<any> {
    return dispatch(updateOAuth({id, form, authenticityToken}));
  },

  onToggleEnabledOAuth(id: number, isEnabled: boolean, authenticityToken: string) {
    dispatch(updateOAuth({id, isEnabled, authenticityToken}));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AuthenticationSiteSettingsP);