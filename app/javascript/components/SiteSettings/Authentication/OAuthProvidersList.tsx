import * as React from 'react';
import I18n from 'i18n-js';

import { AuthenticationPages } from './AuthenticationSiteSettingsP';
import Button from '../../common/Button';

interface Props {
  setPage: React.Dispatch<React.SetStateAction<AuthenticationPages>>;
}

const OAuthProvidersList = ({
  setPage,
}: Props) => (
  <>
    <div className="oauthProvidersTitle">
      <h3>{ I18n.t('site_settings.authentication.oauth_subtitle') }</h3>
      <Button onClick={() => setPage('new')}>
        { I18n.t('common.buttons.new') }
      </Button>
    </div>
  </>
);

export default OAuthProvidersList;