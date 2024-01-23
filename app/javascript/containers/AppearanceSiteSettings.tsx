import { connect } from "react-redux";

import AppearanceSiteSettingsP from "../components/SiteSettings/Appearance/AppearanceSiteSettingsP";
import { updateTenant } from "../actions/Tenant/updateTenant";
import { State } from "../reducers/rootReducer";

const mapStateToProps = (state: State) => ({
  areUpdating: state.siteSettings.appearance.areUpdating,
  error: state.siteSettings.appearance.error,
});

const mapDispatchToProps = (dispatch: any) => ({
  updateTenant(
    customCss: string,
    authenticityToken: string,
  ): Promise<any> {
    return dispatch(updateTenant({
      tenantSetting: {
        custom_css: customCss,
      },
      authenticityToken,
    }));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AppearanceSiteSettingsP);