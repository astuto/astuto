import * as React from 'react';
import I18n from 'i18n-js';

import Box from '../../common/Box';
import OAuthProvidersList from './OAuthProvidersList';
import { AuthenticationPages } from './AuthenticationSiteSettingsP';
import { OAuthsState } from '../../../reducers/oAuthsReducer';
import SiteSettingsInfoBox from '../../common/SiteSettingsInfoBox';
import ActionLink from '../../common/ActionLink';
import { LearnMoreIcon } from '../../common/Icons';

interface Props {
  oAuths: OAuthsState;
  isSubmitting: boolean;
  submitError: string;

  handleToggleEnabledOAuth(id: number, enabled: boolean): void;
  handleToggleEnabledDefaultOAuth(id: number, enabled: boolean): void;
  handleDeleteOAuth(id: number): void;

  setPage: React.Dispatch<React.SetStateAction<AuthenticationPages>>;
  setSelectedOAuth: React.Dispatch<React.SetStateAction<number>>;
}

const AuthenticationIndexPage = ({
  oAuths,
  isSubmitting,
  submitError,

  handleToggleEnabledOAuth,
  handleToggleEnabledDefaultOAuth,
  handleDeleteOAuth,

  setPage,
  setSelectedOAuth,
}: Props) => (
  <>
    <Box customClass="authenticationIndexPage">
      <h2>{ I18n.t('site_settings.authentication.title') }</h2>

      <p style={{textAlign: 'left'}}>
        <ActionLink
          onClick={() => window.open('https://docs.astuto.io/category/oauth-configuration/', '_blank')}
          icon={<LearnMoreIcon />}
        >
          {I18n.t('site_settings.authentication.learn_more')}
        </ActionLink>
      </p>

      <OAuthProvidersList
        oAuths={oAuths.items}
        handleToggleEnabledOAuth={handleToggleEnabledOAuth}
        handleToggleEnabledDefaultOAuth={handleToggleEnabledDefaultOAuth}
        handleDeleteOAuth={handleDeleteOAuth}
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