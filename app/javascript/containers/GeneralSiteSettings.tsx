import { connect } from "react-redux";

import GeneralSiteSettingsP from "../components/SiteSettings/General/GeneralSiteSettingsP";
import { updateTenant } from "../actions/Tenant/updateTenant";
import { State } from "../reducers/rootReducer";
import {
  TenantSettingBrandDisplay,
  TenantSettingCollapseBoardsInHeader,
  TenantSettingFeedbackApprovalPolicy,
  TenantSettingLogoLinksTo,
} from "../interfaces/ITenantSetting";

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
    useBrowserLocale: boolean,
    rootBoardId: number,
    customDomain: string,
    isPrivate: boolean,
    allowAnonymousFeedback: boolean,
    feedbackApprovalPolicy: TenantSettingFeedbackApprovalPolicy,
    logoLinksTo: TenantSettingLogoLinksTo,
    logoCustomUrl: string,
    showRoadmapInHeader: boolean,
    collapseBoardsInHeader: TenantSettingCollapseBoardsInHeader,
    showVoteCount: boolean,
    showVoteButtonInBoard: boolean,
    showPoweredBy: boolean,
    authenticityToken: string
  ): Promise<any> {
    return dispatch(updateTenant({
      siteName,
      siteLogo,
      tenantSetting: {
        brand_display: brandDisplaySetting,
        use_browser_locale: useBrowserLocale,
        root_board_id: rootBoardId,
        is_private: isPrivate,
        allow_anonymous_feedback: allowAnonymousFeedback,
        feedback_approval_policy: feedbackApprovalPolicy,
        logo_links_to: logoLinksTo,
        logo_custom_url: logoCustomUrl,
        show_roadmap_in_header: showRoadmapInHeader,
        collapse_boards_in_header: collapseBoardsInHeader,
        show_vote_count: showVoteCount,
        show_vote_button_in_board: showVoteButtonInBoard,
        show_powered_by: showPoweredBy,
      },
      locale,
      customDomain,
      authenticityToken,
    }));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GeneralSiteSettingsP);