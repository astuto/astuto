import * as React from 'react';
import { useState, useEffect } from 'react';

import HttpStatus from '../../../constants/http_status';
import { IOAuth } from '../../../interfaces/IOAuth';
import { OAuthsState } from '../../../reducers/oAuthsReducer';

import AuthenticationFormPage from './AuthenticationFormPage';
import AuthenticationIndexPage from './AuthenticationIndexPage';
import { ISiteSettingsOAuthForm } from './OAuthForm';

interface Props {
  oAuths: OAuthsState;

  requestOAuths(): void;
  onSubmitOAuth(oAuth: IOAuth, authenticityToken: string): Promise<any>;
  onUpdateOAuth(id: number, form: ISiteSettingsOAuthForm, authenticityToken: string): Promise<any>;
  onToggleEnabledOAuth(id: number, isEnabled: boolean, authenticityToken: string): void;
  onDeleteOAuth(id: number, authenticityToken: string): void;

  isSubmitting: boolean;
  submitError: string;

  authenticityToken: string;
}

export type AuthenticationPages = 'index' | 'new' | 'edit';

const AuthenticationSiteSettingsP = ({
  oAuths,
  requestOAuths,
  onSubmitOAuth,
  onUpdateOAuth,
  onToggleEnabledOAuth,
  onDeleteOAuth,
  isSubmitting,
  submitError,
  authenticityToken,
}: Props) => {
  const [page, setPage] = useState<AuthenticationPages>('index');
  const [selectedOAuth, setSelectedOAuth] = useState<number>(null);

  useEffect(requestOAuths, []);

  const handleSubmitOAuth = (oAuth: IOAuth) => {
    onSubmitOAuth(oAuth, authenticityToken).then(res => {
      if (res?.status === HttpStatus.Created) setPage('index');
    });
  };

  const handleUpdateOAuth = (id: number, form: ISiteSettingsOAuthForm) => {
    onUpdateOAuth(id, form, authenticityToken).then(res => {
      if (res?.status === HttpStatus.OK) setPage('index');
    });
  };

  const handleToggleEnabledOAuth = (id: number, enabled: boolean) => {
    onToggleEnabledOAuth(id, enabled, authenticityToken);
  };

  const handleDeleteOAuth = (id: number) => {
    onDeleteOAuth(id, authenticityToken);
  };

  return (
    page === 'index' ?
      <AuthenticationIndexPage
        oAuths={oAuths}
        handleToggleEnabledOAuth={handleToggleEnabledOAuth}
        handleDeleteOAuth={handleDeleteOAuth}
        setPage={setPage}
        setSelectedOAuth={setSelectedOAuth}
        isSubmitting={isSubmitting}
        submitError={submitError}
      />
    :
      <AuthenticationFormPage
        handleSubmitOAuth={handleSubmitOAuth}
        handleUpdateOAuth={handleUpdateOAuth}
        isSubmitting={isSubmitting}
        submitError={submitError}
        selectedOAuth={oAuths.items.find(oAuth => oAuth.id === selectedOAuth)}
        page={page}
        setPage={setPage}
      />
  );
};

export default AuthenticationSiteSettingsP;