import * as React from 'react';
import { useState } from 'react';
import HttpStatus from '../../../constants/http_status';
import IOAuth from '../../../interfaces/IOAuth';

import AuthenticationFormPage from './AuthenticationFormPage';
import AuthenticationIndexPage from './AuthenticationIndexPage';

interface Props {
  handleSubmitOAuth(oAuth: IOAuth, authenticityToken: string): Promise<any>;

  isSubmitting: boolean;
  submitError: string;

  authenticityToken: string;
}

export type AuthenticationPages = 'index' | 'new' | 'edit';

const AuthenticationSiteSettingsP = ({
  handleSubmitOAuth,
  isSubmitting,
  submitError,
  authenticityToken,
}: Props) => {
  const [page, setPage] = useState<AuthenticationPages>('index');

  const submitOAuth = (oAuth: IOAuth) => {
    handleSubmitOAuth(oAuth, authenticityToken).then(res => {
      if (res?.status !== HttpStatus.Created) return;

      setPage('index');
    })
  }

  return (
    page === 'index' ?
      <AuthenticationIndexPage setPage={setPage} />
    :
      <AuthenticationFormPage
        handleSubmitOAuth={submitOAuth}
        isSubmitting={isSubmitting}
        submitError={submitError}
        page={page}
        setPage={setPage}
      />
  );
};

export default AuthenticationSiteSettingsP;