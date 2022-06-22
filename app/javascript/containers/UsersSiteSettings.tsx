import { connect } from "react-redux";
import { requestUsers } from "../actions/User/requestUsers";

import UsersSiteSettingsP from "../components/SiteSettings/Users/UsersSiteSettingsP";

import { State } from "../reducers/rootReducer";

const mapStateToProps = (state: State) => ({
  users: state.users,
  settingsAreUpdating: state.siteSettings.users.areUpdating,
  settingsError: state.siteSettings.users.error,
});

const mapDispatchToProps = (dispatch: any) => ({
  requestUsers() {
    dispatch(requestUsers());
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UsersSiteSettingsP);