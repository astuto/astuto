import * as React from 'react';
import I18n from 'i18n-js';

import Box from '../../common/Box';
import SiteSettingsInfoBox from '../../common/SiteSettingsInfoBox';
import { ISiteSettingsGeneralForm } from '../../../reducers/SiteSettings/generalReducer';

interface Props {
  authenticityToken: string;

  form: ISiteSettingsGeneralForm;
  areUpdating: boolean;
  error: string;

  requestTenant(): void;
}

class GeneralSiteSettingsP extends React.Component<Props> {
  componentDidMount() {
    this.props.requestTenant();
  }

  render() {
    const {
      form,
      areUpdating,
      error
    } = this.props;

    return (
      <>
        <Box>
          <h2>{ I18n.t('site_settings.general.title') }</h2>

          <div className="formGroup">
            <label htmlFor="siteName">{ I18n.t('site_settings.general.site_name') }</label>
            <input type="text" value={form.siteName || ''} className="formControl" />
          </div>

          <div className="formGroup">
            <label htmlFor="siteLogo">{ I18n.t('site_settings.general.site_logo') }</label>
            <input type="text" value={form.siteLogo || ''} className="formControl" />
          </div>

          <div className="formGroup">
            <label htmlFor="selectPickerLocale">{ I18n.t('site_settings.general.locale') }</label>
            <select
              value={form.locale || 'Loading...'}
              id="selectPickerLocale"
              className="selectPicker"
            >
              <option value="en">🇬🇧 English</option>
              <option value="it">🇮🇹 Italiano</option>
            </select>
          </div>
        </Box>

        <SiteSettingsInfoBox areUpdating={areUpdating} error={error} />
      </>
    );
  }
}

export default GeneralSiteSettingsP;