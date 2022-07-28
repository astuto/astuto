import * as React from 'react';
import I18n from 'i18n-js';

import { IOAuth } from '../../../interfaces/IOAuth';
import Switch from '../../common/Switch';
import Separator from '../../common/Separator';
import { AuthenticationPages } from './AuthenticationSiteSettingsP';

interface Props {
  oAuth: IOAuth;
  setPage: React.Dispatch<React.SetStateAction<AuthenticationPages>>;
  setSelectedOAuth: React.Dispatch<React.SetStateAction<number>>;
}

const OAuthProviderItem = ({
  oAuth,
  setPage,
  setSelectedOAuth,
}: Props) => (
  <li className="oAuthListItem">
    <div className="oAuthInfo">
      <img src={oAuth.logo} className="oAuthLogo" width={42} height={42} />

      <div className="oAuthNameAndEnabled">
        <span className="oAuthName">{oAuth.name}</span>
        <div className="oAuthIsEnabled">
          <Switch
            label={I18n.t(`common.${oAuth.isEnabled ? 'enabled' : 'disabled'}`)}
            onClick={() => null}
            checked={oAuth.isEnabled}
            htmlId={`oAuth${oAuth.name}EnabledSwitch`}
          />
        </div>
      </div>
    </div>

    <div className="oAuthActions">
      <a onClick={() => {
        console.log(oAuth);
        setSelectedOAuth(oAuth.id);
        setPage('edit');
      }}>
        { I18n.t('common.buttons.edit') }
      </a>
      <Separator />
      <a onClick={() => null}>
        { I18n.t('common.buttons.delete') }
      </a>
    </div>
  </li>
);

export default OAuthProviderItem;