import { connect } from "react-redux";

import GeneralSiteSettingsP from "../components/SiteSettings/General/GeneralSiteSettingsP";
import { updateTenant } from "../actions/Tenant/updateTenant";
import { State } from "../reducers/rootReducer";
import { TenantSettingBrandDisplay } from "../interfaces/ITenantSetting";

const mapStateToProps = (state: State) => ({
  areUpdating: state.siteSettings.general.areUpdating,
  error: state.siteSettings.general.error,
});

const mapDispatchToProps = (dispatch: any) => ({
  updateTenant(
    siteName: string,
    siteLogo: string,
    brandDisplaySetting: TenantSettingBrandDisplay,
    locale: string,
    authenticityToken: string
  ): Promise<any> {
    return dispatch(updateTenant({
      siteName,
      siteLogo,
      tenantSetting: { brand_display: brandDisplaySetting },
      locale,
      authenticityToken,
    }));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GeneralSiteSettingsP);