import * as React from 'react';
import I18n from 'i18n-js';

import Box from '../../common/Box';
import OAuthProvidersList from './OAuthProvidersList';
import { AuthenticationPages } from './AuthenticationSiteSettingsP';

interface Props {
  setPage: React.Dispatch<React.SetStateAction<AuthenticationPages>>;
}

const AuthenticationIndexPage = ({
  setPage,
}: Props) => (
  <>
    <Box customClass="authenticationIndexPage">
      <h2>{ I18n.t('site_settings.authentication.title') }</h2>

      <OAuthProvidersList setPage={setPage} />
    </Box>
  </>
);

export default AuthenticationIndexPage;