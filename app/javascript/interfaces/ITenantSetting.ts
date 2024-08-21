// Brand display setting
export const TENANT_SETTING_BRAND_DISPLAY_NAME_AND_LOGO = 'name_and_logo';
export const TENANT_SETTING_BRAND_DISPLAY_NAME_ONLY = 'name_only';
export const TENANT_SETTING_BRAND_DISPLAY_LOGO_ONLY = 'logo_only';
export const TENANT_SETTING_BRAND_DISPLAY_NONE = 'no_name_no_logo';

export type TenantSettingBrandDisplay =
  typeof TENANT_SETTING_BRAND_DISPLAY_NAME_AND_LOGO |
  typeof TENANT_SETTING_BRAND_DISPLAY_NAME_ONLY |
  typeof TENANT_SETTING_BRAND_DISPLAY_LOGO_ONLY |
  typeof TENANT_SETTING_BRAND_DISPLAY_NONE;

// Feedback approval policy
export const TENANT_SETTING_FEEDBACK_APPROVAL_POLICY_ANONYMOUS_REQUIRE_APPROVAL = 'anonymous_require_approval';
export const TENANT_SETTING_FEEDBACK_APPROVAL_POLICY_NEVER_REQUIRE_APPROVAL = 'never_require_approval';
export const TENANT_SETTING_FEEDBACK_APPROVAL_POLICY_ALWAYS_REQUIRE_APPROVAL = 'always_require_approval';

export type TenantSettingFeedbackApprovalPolicy =
  typeof TENANT_SETTING_FEEDBACK_APPROVAL_POLICY_ANONYMOUS_REQUIRE_APPROVAL |
  typeof TENANT_SETTING_FEEDBACK_APPROVAL_POLICY_NEVER_REQUIRE_APPROVAL |
  typeof TENANT_SETTING_FEEDBACK_APPROVAL_POLICY_ALWAYS_REQUIRE_APPROVAL;

// Collapse boards in header
export const TENANT_SETTING_COLLAPSE_BOARDS_IN_HEADER_NO_COLLAPSE = 'no_collapse';
export const TENANT_SETTING_COLLAPSE_BOARDS_IN_HEADER_ALWAYS_COLLAPSE = 'always_collapse';

export type TenantSettingCollapseBoardsInHeader =
  typeof TENANT_SETTING_COLLAPSE_BOARDS_IN_HEADER_NO_COLLAPSE |
  typeof TENANT_SETTING_COLLAPSE_BOARDS_IN_HEADER_ALWAYS_COLLAPSE;


interface ITenantSetting {
  brand_display?: TenantSettingBrandDisplay;
  root_board_id?: number;
  is_private?: boolean;
  allow_anonymous_feedback?: boolean;
  feedback_approval_policy?: TenantSettingFeedbackApprovalPolicy;
  show_vote_count?: boolean;
  show_vote_button_in_board?: boolean;
  show_roadmap_in_header?: boolean;
  show_powered_by?: boolean;
  collapse_boards_in_header?: TenantSettingCollapseBoardsInHeader;
  custom_css?: string;
}

export default ITenantSetting;