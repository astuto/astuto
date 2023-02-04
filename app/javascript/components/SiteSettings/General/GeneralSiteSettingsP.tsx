import * as React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import I18n from 'i18n-js';

import Box from '../../common/Box';
import SiteSettingsInfoBox from '../../common/SiteSettingsInfoBox';
import Button from '../../common/Button';
import HttpStatus from '../../../constants/http_status';
import {
  TENANT_SETTING_BRAND_DISPLAY_NAME_AND_LOGO,
  TENANT_SETTING_BRAND_DISPLAY_NAME_ONLY,
  TENANT_SETTING_BRAND_DISPLAY_LOGO_ONLY,
  TENANT_SETTING_BRAND_DISPLAY_NONE,
} from '../../../interfaces/ITenantSetting';
import { DangerText } from '../../common/CustomTexts';
import { getLabel, getValidationMessage } from '../../../helpers/formUtils';

export interface ISiteSettingsGeneralForm {
  siteName: string;
  siteLogo: string;
  brandDisplaySetting: string;
  locale: string;
}

interface Props {
  originForm: ISiteSettingsGeneralForm;
  authenticityToken: string;

  areUpdating: boolean;
  error: string;

  updateTenant(
    siteName: string,
    siteLogo: string,
    brandDisplaySetting: string,
    locale: string,
    authenticityToken: string
  ): Promise<any>;
}

const GeneralSiteSettingsP = ({
  originForm,
  authenticityToken,

  areUpdating,
  error,
  updateTenant,
}: Props) => {
  const {
    register,
    handleSubmit,
    formState: { isDirty, isSubmitSuccessful, errors }
  } = useForm<ISiteSettingsGeneralForm>({
    defaultValues: {
      siteName: originForm.siteName,
      siteLogo: originForm.siteLogo,
      brandDisplaySetting: originForm.brandDisplaySetting,
      locale: originForm.locale,
    },
  });
  
  const onSubmit: SubmitHandler<ISiteSettingsGeneralForm> = data => {
    updateTenant(
      data.siteName,
      data.siteLogo,
      data.brandDisplaySetting,
      data.locale,
      authenticityToken,
    ).then(res => {
      if (res?.status !== HttpStatus.OK) return;
      window.location.reload();
    });
  };

  return (
    <>
      <Box>
        <h2>{ I18n.t('site_settings.general.title') }</h2>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="formRow">
            <div className="formGroup col-4">
              <label htmlFor="siteName">{ getLabel('tenant', 'site_name') }</label>
              <input
                {...register('siteName', { required: true })}
                id="siteName"
                className="formControl"
              />
              <DangerText>{errors.siteName && getValidationMessage(errors.siteName.type, 'tenant', 'site_name')}</DangerText>
            </div>

            <div className="formGroup col-4">
              <label htmlFor="siteLogo">{ getLabel('tenant', 'site_logo') }</label>
              <input
                {...register('siteLogo')}
                id="siteLogo"
                className="formControl"
              />
            </div>

            <div className="formGroup col-4">
              <label htmlFor="brandSetting">{ getLabel('tenant', 'brand_setting') }</label>
              <select
                {...register('brandDisplaySetting')}
                id="brandSetting"
                className="selectPicker"
              >
                <option value={TENANT_SETTING_BRAND_DISPLAY_NAME_AND_LOGO}>
                  { I18n.t('site_settings.general.brand_setting_both') }
                </option>
                <option value={TENANT_SETTING_BRAND_DISPLAY_NAME_ONLY}>
                  { I18n.t('site_settings.general.brand_setting_name') }
                </option>
                <option value={TENANT_SETTING_BRAND_DISPLAY_LOGO_ONLY}>
                  { I18n.t('site_settings.general.brand_setting_logo') }
                </option>
                <option value={TENANT_SETTING_BRAND_DISPLAY_NONE}>
                  { I18n.t('site_settings.general.brand_setting_none') }
                </option>
              </select>
            </div>
          </div>

          <div className="formGroup">
            <label htmlFor="locale">{ getLabel('tenant', 'locale') }</label>
            <select
              {...register('locale')}
              id="locale"
              className="selectPicker"
            >
              <option value="en">🇬🇧 English</option>
              <option value="it">🇮🇹 Italiano</option>
              <option value="de">🇩🇪 Deutsch</option>
              <option value="fr">🇫🇷 Français</option>
              <option value="ru">🇷🇺 Русский</option>
            </select>
          </div>

          <br />

          <Button onClick={() => null} disabled={!isDirty}>
            {I18n.t('common.buttons.update')}
          </Button>
        </form>
      </Box>

      <SiteSettingsInfoBox
        areUpdating={areUpdating}
        error={error}
        areDirty={isDirty && !isSubmitSuccessful}
      />
    </>
  );
}

export default GeneralSiteSettingsP;