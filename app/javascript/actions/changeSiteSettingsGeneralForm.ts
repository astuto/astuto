// siteName
export const SITE_SETTINGS_CHANGE_GENERAL_FORM_SITE_NAME = 'SITE_SETTINGS_CHANGE_GENERAL_FORM_SITE_NAME';

interface SiteSettingsChangeGeneralFormSiteName {
  type: typeof SITE_SETTINGS_CHANGE_GENERAL_FORM_SITE_NAME,
  siteName: string,
}

export const changeSiteSettingsGeneralFormSiteName = (
  siteName: string
): SiteSettingsChangeGeneralFormSiteName => ({
  type: SITE_SETTINGS_CHANGE_GENERAL_FORM_SITE_NAME,
  siteName,
});

// siteLogo
export const SITE_SETTINGS_CHANGE_GENERAL_FORM_SITE_LOGO = 'SITE_SETTINGS_CHANGE_GENERAL_FORM_SITE_LOGO';

interface SiteSettingsChangeGeneralFormSiteLogo {
  type: typeof SITE_SETTINGS_CHANGE_GENERAL_FORM_SITE_LOGO,
  siteLogo: string,
}

export const changeSiteSettingsGeneralFormSiteLogo = (
  siteLogo: string
): SiteSettingsChangeGeneralFormSiteLogo => ({
  type: SITE_SETTINGS_CHANGE_GENERAL_FORM_SITE_LOGO,
  siteLogo,
});

// brandDisplaySetting
export const SITE_SETTINGS_CHANGE_GENERAL_FORM_BRAND_SETTING = 'SITE_SETTINGS_CHANGE_GENERAL_FORM_BRAND_SETTING';

interface SiteSettingsChangeGeneralFormBrandSetting {
  type: typeof SITE_SETTINGS_CHANGE_GENERAL_FORM_BRAND_SETTING,
  brandDisplaySetting: string,
}

export const changeSiteSettingsGeneralFormBrandSetting = (
  brandDisplaySetting: string
): SiteSettingsChangeGeneralFormBrandSetting => ({
  type: SITE_SETTINGS_CHANGE_GENERAL_FORM_BRAND_SETTING,
  brandDisplaySetting,
});

// locale
export const SITE_SETTINGS_CHANGE_GENERAL_FORM_LOCALE = 'SITE_SETTINGS_CHANGE_GENERAL_FORM_LOCALE';

interface SiteSettingsChangeGeneralFormLocale {
  type: typeof SITE_SETTINGS_CHANGE_GENERAL_FORM_LOCALE,
  locale: string,
}

export const changeSiteSettingsGeneralFormLocale = (
  locale: string
): SiteSettingsChangeGeneralFormLocale => ({
  type: SITE_SETTINGS_CHANGE_GENERAL_FORM_LOCALE,
  locale,
});

export type ChangeSiteSettingsGeneralFormActionTypes =
  SiteSettingsChangeGeneralFormSiteName |
  SiteSettingsChangeGeneralFormSiteLogo |
  SiteSettingsChangeGeneralFormBrandSetting |
  SiteSettingsChangeGeneralFormLocale;