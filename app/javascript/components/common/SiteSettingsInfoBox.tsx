import * as React from 'react';
import I18n from 'i18n-js';

import Spinner from './Spinner';
import Box from './Box';

interface Props {
  areUpdating: boolean;
  error: string;
  areDirty?: boolean;
  isSticky?: boolean;
  saveButton?: React.ReactNode;
}

const SiteSettingsInfoBox = ({
  areUpdating,
  error,
  areDirty = false,
  isSticky = false,
  saveButton = null,
}: Props) => (
  <Box customClass={`siteSettingsInfo${isSticky ? ' siteSettingsInfoSticky' : ''}`}>
  {
    areUpdating ?
      <Spinner />
    :
      error ?
        <span className="error">
          { I18n.t('site_settings.info_box.error', { message: JSON.stringify(error) }) }
        </span>
      :
        areDirty ?
          <>
            <span className="warning">{ I18n.t('site_settings.info_box.dirty') }</span>
            {saveButton && saveButton}
          </>
        :
          <span>{ I18n.t('site_settings.info_box.up_to_date') }</span>
  }
  </Box>
);

export default SiteSettingsInfoBox;