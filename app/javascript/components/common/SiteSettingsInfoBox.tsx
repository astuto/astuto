import * as React from 'react';
import I18n from 'i18n-js';

import Spinner from './Spinner';

interface Props {
  areUpdating: boolean;
  error: string;
}

const SiteSettingsInfoBox = ({ areUpdating, error }: Props) => (
  <div className="content siteSettingsInfo">
  {
    areUpdating ?
      <Spinner />
    :
      error ?
        <span className="error">
          {I18n.t('site_settings.info_box.error', { message: JSON.stringify(error) })}
        </span>
      :
        <span>{I18n.t('site_settings.info_box.up_to_date')}</span>
  }
  </div>
);

export default SiteSettingsInfoBox;