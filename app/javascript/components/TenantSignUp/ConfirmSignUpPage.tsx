import * as React from 'react';
import I18n from 'i18n-js';
import Box from '../common/Box';

interface Props {
  subdomain: string;
  userEmail: string;
}

const ConfirmSignUpPage = ({
  subdomain,
  userEmail,
}: Props) => (
  <Box>
    <h3>{ I18n.t('signup.step3.title') }</h3>

    <p>{ I18n.t('signup.step3.message_html', { email: userEmail, subdomain: `${subdomain}.astuto.io` }) }</p>
  </Box>
);

export default ConfirmSignUpPage;