import { connect } from "react-redux";
import { requestTenant } from "../actions/Tenant/requestTenant";

import GeneralSiteSettingsP from "../components/SiteSettings/General/GeneralSiteSettingsP";
import { State } from "../reducers/rootReducer";

const mapStateToProps = (state: State) => ({
  form: state.siteSettings.general.form,
  areUpdating: state.siteSettings.general.areUpdating,
  error: state.siteSettings.general.error,
});

const mapDispatchToProps = (dispatch: any) => ({
  requestTenant() {
    dispatch(requestTenant());
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GeneralSiteSettingsP);