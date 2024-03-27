import * as React from 'react';
import I18n from 'i18n-js';

interface Props {
  oAuthId: number;
  oAuthName: string;
  oAuthLogo?: string;
  oAuthReason: string;
  isSignUp?: boolean;

  href?: string;
}

const OAuthProviderLink = ({ oAuthId, oAuthName, oAuthLogo, oAuthReason, isSignUp = false, href = undefined }: Props) => (
  <button
    onClick={
      () => { alert(href); window.location.href = href ? href : `/o_auths/${oAuthId}/start?reason=${oAuthReason}` }
    }
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