import * as React from 'react';
import I18n from 'i18n-js';

import Box from '../../common/Box';
import { AuthenticationPages } from './AuthenticationSiteSettingsP';
import OAuthForm, { ISiteSettingsOAuthForm } from './OAuthForm';
import Spinner from '../../common/Spinner';
import { DangerText } from '../../common/CustomTexts';
import { IOAuth } from '../../../interfaces/IOAuth';

interface Props {
  handleSubmitOAuth(oAuth: IOAuth): void;
  handleUpdateOAuth(id: number, form: ISiteSettingsOAuthForm): void;
  isSubmitting: boolean;
  submitError: string;
  selectedOAuth: IOAuth;
  page: AuthenticationPages;
  setPage: React.Dispatch<React.SetStateAction<AuthenticationPages>>;
}

const AuthenticationFormPage = ({
  handleSubmitOAuth,
  handleUpdateOAuth,
  isSubmitting,
  submitError,
  selectedOAuth,
  page,
  setPage,
}: Props) => (
  <>
    <Box customClass="authenticationFormPage">
      <a onClick={() => setPage('index')} className="backButton">
        ← { I18n.t('common.buttons.back') }
      </a>
      <h2>{ I18n.t(`site_settings.authentication.form.title_${page}`) }</h2>

      <OAuthForm
        handleSubmitOAuth={handleSubmitOAuth}
        handleUpdateOAuth={handleUpdateOAuth}
        selectedOAuth={selectedOAuth}
        page={page}
      />

      { isSubmitting && <Spinner /> }
      { submitError && <DangerText>{submitError}</DangerText> }
    </Box>
  </>
);

export default AuthenticationFormPage;