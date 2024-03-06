import * as React from 'react';
import I18n from 'i18n-js';

interface Props {
  oAuthId: number;
  oAuthName: string;
  oAuthLogo?: string;
  oAuthReason: string;
  isSignUp?: boolean;
}

const OAuthProviderLink = ({ oAuthId, oAuthName, oAuthLogo, oAuthReason, isSignUp = false }: Props) => (
  <button
    onClick={() => window.location.href = `/o_auths/${oAuthId}/start?reason=${oAuthReason}`}
    className={`oauthProviderBtn oauthProvider${oAuthName.replace(' ', '')}`}
  >
    { oAuthLogo && oAuthLogo.length > 0 && <img src={oAuthLogo} alt={oAuthName} width={28} height={28} /> }
    <span className='oauthProviderText'>
      {
        isSignUp ?
          I18n.t('common.forms.auth.sign_up_with', { o_auth: oAuthName })
          :
          I18n.t('common.forms.auth.log_in_with', { o_auth: oAuthName })
      }
    </span>
  </button>
);

export default OAuthProviderLink;