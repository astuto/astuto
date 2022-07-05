import * as React from 'react';
import I18n from 'i18n-js';

import Box from '../../common/Box';
import SiteSettingsInfoBox from '../../common/SiteSettingsInfoBox';
import { ISiteSettingsGeneralForm } from '../../../reducers/SiteSettings/generalReducer';
import Button from '../../common/Button';
import HttpStatus from '../../../constants/http_status';

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
    locale: string,
    authenticityToken: string
  ): Promise<any>;

  handleChangeSiteName(siteName: string): void;
  handleChangeSiteLogo(siteLogo: string): void;
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
    const { siteName, siteLogo, locale } = this.props.form;

    this.props.updateTenant(
      siteName,
      siteLogo,
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
      handleChangeLocale,
    } = this.props;

    return (
      <>
        <Box>
          <h2>{ I18n.t('site_settings.general.title') }</h2>

          <form>
            <div className="formRow">
              <div className="formGroup col-6">
                <label htmlFor="siteName">{ I18n.t('site_settings.general.site_name') }</label>
                <input
                  type="text"
                  value={form.siteName || ''}
                  onChange={e => handleChangeSiteName(e.target.value)}
                  id="siteName"
                  className="formControl"
                />
              </div>

              <div className="formGroup col-6">
                <label htmlFor="siteLogo">{ I18n.t('site_settings.general.site_logo') }</label>
                <input
                  type="text"
                  value={form.siteLogo || ''}
                  onChange={e => handleChangeSiteLogo(e.target.value)}
                  id="siteLogo"
                  className="formControl"
                />
              </div>
            </div>

            <div className="formGroup">
              <label htmlFor="selectPickerLocale">{ I18n.t('site_settings.general.locale') }</label>
              <select
                value={form.locale || 'Loading...'}
                onChange={e => handleChangeLocale(e.target.value)}
                id="selectPickerLocale"
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