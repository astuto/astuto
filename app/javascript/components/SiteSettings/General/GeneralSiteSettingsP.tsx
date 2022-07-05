import * as React from 'react';
import I18n from 'i18n-js';

import Box from '../../common/Box';
import SiteSettingsInfoBox from '../../common/SiteSettingsInfoBox';
import { ISiteSettingsGeneralForm } from '../../../reducers/SiteSettings/generalReducer';
import Button from '../../common/Button';
import HttpStatus from '../../../constants/http_status';
import {
  TENANT_BRAND_NAME_AND_LOGO,
  TENANT_BRAND_NAME_ONLY,
  TENANT_BRAND_LOGO_ONLY,
  TENANT_BRAND_NONE,
} from '../../../interfaces/ITenant';

interface Props {
  authenticityToken: string;

  form: ISiteSettingsGeneralForm;
  areDirty: boolean;
  areUpdating: boolean;
  error: string;

  requestTenant(): void;
  updateTenant(
    siteName: string,
    siteLogo: string,
    brandDisplaySetting: string,
    locale: string,
    authenticityToken: string
  ): Promise<any>;

  handleChangeSiteName(siteName: string): void;
  handleChangeSiteLogo(siteLogo: string): void;
  handleChangeBrandDisplaySetting(brandDisplaySetting: string)
  handleChangeLocale(locale: string): void;
}

class GeneralSiteSettingsP extends React.Component<Props> {
  constructor(props: Props) {
    super(props);

    this._handleUpdateTenant = this._handleUpdateTenant.bind(this);
  }

  componentDidMount() {
    this.props.requestTenant();
  }

  _handleUpdateTenant() {
    const { siteName, siteLogo, brandDisplaySetting, locale } = this.props.form;

    this.props.updateTenant(
      siteName,
      siteLogo,
      brandDisplaySetting,
      locale,
      this.props.authenticityToken,
    ).then(res => {
      if (res?.status !== HttpStatus.OK) return;

      window.location.reload();
    });
  }

  render() {
    const {
      form,
      areDirty,
      areUpdating,
      error,

      handleChangeSiteName,
      handleChangeSiteLogo,
      handleChangeBrandDisplaySetting,
      handleChangeLocale,
    } = this.props;

    return (
      <>
        <Box>
          <h2>{ I18n.t('site_settings.general.title') }</h2>

          <form>
            <div className="formRow">
              <div className="formGroup col-4">
                <label htmlFor="siteName">{ I18n.t('site_settings.general.site_name') }</label>
                <input
                  type="text"
                  value={form.siteName || ''}
                  onChange={e => handleChangeSiteName(e.target.value)}
                  id="siteName"
                  className="formControl"
                />
              </div>

              <div className="formGroup col-4">
                <label htmlFor="siteLogo">{ I18n.t('site_settings.general.site_logo') }</label>
                <input
                  type="text"
                  value={form.siteLogo || ''}
                  onChange={e => handleChangeSiteLogo(e.target.value)}
                  id="siteLogo"
                  className="formControl"
                />
              </div>

              <div className="formGroup col-4">
                <label htmlFor="brandSetting">{ I18n.t('site_settings.general.brand_setting') }</label>
                <select
                  value={form.brandDisplaySetting || 'Loading...'}
                  onChange={e => handleChangeBrandDisplaySetting(e.target.value)}
                  id="brandSetting"
                  className="selectPicker"
                >
                  <option value={TENANT_BRAND_NAME_AND_LOGO}>
                    { I18n.t('site_settings.general.brand_setting_both') }
                  </option>
                  <option value={TENANT_BRAND_NAME_ONLY}>
                    { I18n.t('site_settings.general.brand_setting_name') }
                  </option>
                  <option value={TENANT_BRAND_LOGO_ONLY}>
                    { I18n.t('site_settings.general.brand_setting_logo') }
                  </option>
                  <option value={TENANT_BRAND_NONE}>
                    { I18n.t('site_settings.general.brand_setting_none') }
                  </option>
                </select>
              </div>
            </div>

            <div className="formGroup">
              <label htmlFor="locale">{ I18n.t('site_settings.general.locale') }</label>
              <select
                value={form.locale || 'Loading...'}
                onChange={e => handleChangeLocale(e.target.value)}
                id="locale"
                className="selectPicker"
              >
                <option value="en">🇬🇧 English</option>
                <option value="it">🇮🇹 Italiano</option>
              </select>
            </div>
          </form>

          <br />

          <Button
            onClick={this._handleUpdateTenant}
            disabled={!areDirty}
          >
            { I18n.t('common.buttons.update') }
          </Button>
        </Box>

        <SiteSettingsInfoBox areUpdating={areUpdating} error={error} areDirty={areDirty} />
      </>
    );
  }
}

export default GeneralSiteSettingsP;