// Brand display setting
export const TENANT_BRAND_NAME_AND_LOGO = 'name_and_logo';
export const TENANT_BRAND_NAME_ONLY = 'name_only';
export const TENANT_BRAND_LOGO_ONLY = 'logo_only';
export const TENANT_BRAND_NONE = 'no_name_no_logo';

export type TenantBrandDisplaySetting =
  typeof TENANT_BRAND_NAME_AND_LOGO |
  typeof TENANT_BRAND_NAME_ONLY |
  typeof TENANT_BRAND_LOGO_ONLY |
  typeof TENANT_BRAND_NONE;

interface ITenant {
  id: number;
  siteName: string;
  siteLogo: string;
  brandDisplaySetting: TenantBrandDisplaySetting;
  locale: string;
}

export default ITenant;