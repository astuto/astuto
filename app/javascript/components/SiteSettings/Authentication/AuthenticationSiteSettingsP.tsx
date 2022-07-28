import * as React from 'react';
import { useState, useEffect } from 'react';

import HttpStatus from '../../../constants/http_status';
import { IOAuth } from '../../../interfaces/IOAuth';
import { OAuthsState } from '../../../reducers/oAuthsReducer';

import AuthenticationFormPage from './AuthenticationFormPage';
import AuthenticationIndexPage from './AuthenticationIndexPage';

interface Props {
  oAuths: OAuthsState;

  requestOAuths(): void;
  handleSubmitOAuth(oAuth: IOAuth, authenticityToken: string): Promise<any>;

  isSubmitting: boolean;
  submitError: string;

  authenticityToken: string;
}

export type AuthenticationPages = 'index' | 'new' | 'edit';

const AuthenticationSiteSettingsP = ({
  oAuths,
  requestOAuths,
  handleSubmitOAuth,
  isSubmitting,
  submitError,
  authenticityToken,
}: Props) => {
  const [page, setPage] = useState<AuthenticationPages>('index');
  const [selectedOAuth, setSelectedOAuth] = useState<number>(null);

  useEffect(requestOAuths, []);

  const submitOAuth = (oAuth: IOAuth) => {
    handleSubmitOAuth(oAuth, authenticityToken).then(res => {
      if (res?.status !== HttpStatus.Created) return;

      setPage('index');
    });
  }

  return (
    page === 'index' ?
      <AuthenticationIndexPage
        oAuths={oAuths}
        setPage={setPage}
        setSelectedOAuth={setSelectedOAuth}
      />
    :
      <AuthenticationFormPage
        handleSubmitOAuth={submitOAuth}
        isSubmitting={isSubmitting}
        submitError={submitError}
        selectedOAuth={oAuths.items.find(oAuth => oAuth.id === selectedOAuth)}
        page={page}
        setPage={setPage}
      />
  );
};

export default AuthenticationSiteSettingsP;