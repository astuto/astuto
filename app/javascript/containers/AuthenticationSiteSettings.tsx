import { connect } from "react-redux";

import AuthenticationSiteSettingsP from "../components/SiteSettings/Authentication/AuthenticationSiteSettingsP";
import { State } from "../reducers/rootReducer";

const mapStateToProps = (state: State) => ({
});

const mapDispatchToProps = (dispatch: any) => ({
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AuthenticationSiteSettingsP);