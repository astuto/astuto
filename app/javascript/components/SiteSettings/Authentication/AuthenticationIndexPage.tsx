import * as React from 'react';
import I18n from 'i18n-js';

import Box from '../../common/Box';
import OAuthProvidersList from './OAuthProvidersList';
import { AuthenticationPages } from './AuthenticationSiteSettingsP';
import { OAuthsState } from '../../../reducers/oAuthsReducer';
import SiteSettingsInfoBox from '../../common/SiteSettingsInfoBox';

interface Props {
  oAuths: OAuthsState;
  handleToggleEnabledOAuth(id: number, enabled: boolean): void;
  setPage: React.Dispatch<React.SetStateAction<AuthenticationPages>>;
  setSelectedOAuth: React.Dispatch<React.SetStateAction<number>>;
  isSubmitting: boolean;
  submitError: string;
}

const AuthenticationIndexPage = ({
  oAuths,
  handleToggleEnabledOAuth,
  setPage,
  setSelectedOAuth,
  isSubmitting,
  submitError,
}: Props) => (
  <>
    <Box customClass="authenticationIndexPage">
      <h2>{ I18n.t('site_settings.authentication.title') }</h2>

      <OAuthProvidersList
        oAuths={oAuths.items}
        handleToggleEnabledOAuth={handleToggleEnabledOAuth}
        setPage={setPage}
        setSelectedOAuth={setSelectedOAuth}
      />
    </Box>

    <SiteSettingsInfoBox
      areUpdating={oAuths.areLoading || isSubmitting}
      error={oAuths.error || submitError}
    />
  </>
);

export default AuthenticationIndexPage;