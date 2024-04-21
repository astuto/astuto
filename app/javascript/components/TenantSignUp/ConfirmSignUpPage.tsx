import * as React from 'react';
import Box from '../common/Box';

interface Props {
  subdomain: string;
  userEmail: string;
  pendingTenantImage: string;
}

const ConfirmSignUpPage = ({
  subdomain,
  userEmail,
  pendingTenantImage,
}: Props) => (
  <Box>
    <h3>You're almost done!</h3>

    <img src={pendingTenantImage} width={64} height={64} style={{margin: '12px auto'}} />

    <p style={{textAlign: 'center'}}>
      Check your email <b>{userEmail}</b> to activate your new feedback space <a href={`https://${subdomain}.astuto.io`} className="link">{subdomain}.astuto.io</a>!
    </p>
  </Box>
);

export default ConfirmSignUpPage;