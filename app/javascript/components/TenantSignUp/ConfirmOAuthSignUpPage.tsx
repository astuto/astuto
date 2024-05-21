import * as React from 'react';
import Box from '../common/Box';

interface Props {
  baseUrl: string;
  subdomain: string;
  feedbackSpaceCreatedImage: string;
}

const ConfirmOAuthSignUpPage = ({
  baseUrl,
  subdomain,
  feedbackSpaceCreatedImage,
}: Props) => {
  let redirectUrl = new URL(baseUrl);
  redirectUrl.hostname = `${subdomain}.${redirectUrl.hostname}`;
  redirectUrl.pathname = '/users/sign_in';

  return (
    <Box>
      <h3>You're all set!</h3>

      <img src={feedbackSpaceCreatedImage} width={64} height={64} style={{margin: '12px auto'}} />

      <p style={{textAlign: 'center'}}>
        You'll be redirected to your feedback space in a few seconds.
      </p>

      <p style={{textAlign: 'center'}}>
        If you are not redirected, please <a href={redirectUrl.toString()} className="link">click here</a>.
      </p>
    </Box>
  );
};

export default ConfirmOAuthSignUpPage;