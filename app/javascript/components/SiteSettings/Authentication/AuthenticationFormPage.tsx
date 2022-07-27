import * as React from 'react';
import I18n from 'i18n-js';

import Box from '../../common/Box';
import { AuthenticationPages } from './AuthenticationSiteSettingsP';
import OAuthForm from './OAuthForm';

interface Props {
  page: AuthenticationPages;
  setPage: React.Dispatch<React.SetStateAction<AuthenticationPages>>;
}

const AuthenticationFormPage = ({
  page,
  setPage,
}: Props) => (
  <>
    <Box customClass="authenticationFormPage">
      <a onClick={() => setPage('index')} className="backButton">
        ← { I18n.t('common.buttons.back') }
      </a>
      <h2>{ I18n.t(`site_settings.authentication.form.title_${page}`) }</h2>

      <OAuthForm />
    </Box>
  </>
);

export default AuthenticationFormPage;