import * as React from 'react';
import I18n from 'i18n-js';

import { AuthenticationPages } from './AuthenticationSiteSettingsP';
import Button from '../../common/Button';
import { IOAuth } from '../../../interfaces/IOAuth';
import OAuthProviderItem from './OAuthProviderItem';

interface Props {
  oAuths: Array<IOAuth>;
  setPage: React.Dispatch<React.SetStateAction<AuthenticationPages>>;
  setSelectedOAuth: React.Dispatch<React.SetStateAction<number>>;
}

const OAuthProvidersList = ({
  oAuths,
  setPage,
  setSelectedOAuth,
}: Props) => (
  <>
    <div className="oauthProvidersTitle">
      <h3>{ I18n.t('site_settings.authentication.oauth_subtitle') }</h3>
      <Button onClick={() => setPage('new')}>
        { I18n.t('common.buttons.new') }
      </Button>
    </div>

    <ul className="oAuthsList">
      {
        oAuths.map((oAuth, i) => (
          <OAuthProviderItem
            oAuth={oAuth}
            setPage={setPage}
            setSelectedOAuth={setSelectedOAuth}
            key={i}
          />
        ))
      }
    </ul>
  </>
);

export default OAuthProvidersList;