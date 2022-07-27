import * as React from 'react';
import { useState } from 'react';

import AuthenticationFormPage from './AuthenticationFormPage';
import AuthenticationIndexPage from './AuthenticationIndexPage';

interface Props {
  authenticityToken: string;
}

export type AuthenticationPages = 'index' | 'new' | 'edit';

const AuthenticationSiteSettingsP = ({
  authenticityToken,
}: Props) => {
  const [page, setPage] = useState<AuthenticationPages>('index');

  return (
    page === 'index' ?
      <AuthenticationIndexPage setPage={setPage} />
    :
      <AuthenticationFormPage page={page} setPage={setPage} />
  );
};

export default AuthenticationSiteSettingsP;