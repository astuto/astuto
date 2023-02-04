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

interface ITenantSetting {
  brand_display?: TenantSettingBrandDisplay;
  show_vote_count?: boolean;
  show_vote_button_in_board?: boolean;
}

export default ITenantSetting;