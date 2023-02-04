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
    showVoteCount: boolean,
    showVoteButtonInBoard: boolean,
    locale: string,
    authenticityToken: string
  ): Promise<any> {
    return dispatch(updateTenant({
      siteName,
      siteLogo,
      tenantSetting: {
        brand_display: brandDisplaySetting,
        show_vote_count: showVoteCount,
        show_vote_button_in_board: showVoteButtonInBoard,
      },
      locale,
      authenticityToken,
    }));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GeneralSiteSettingsP);