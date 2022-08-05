import * as React from 'react';
import I18n from 'i18n-js';

import { IOAuth } from '../../../interfaces/IOAuth';
import Switch from '../../common/Switch';
import Separator from '../../common/Separator';
import { AuthenticationPages } from './AuthenticationSiteSettingsP';
import CopyToClipboardButton from '../../common/CopyToClipboardButton';

interface Props {
  oAuth: IOAuth;
  handleToggleEnabledOAuth(id: number, enabled: boolean): void;
  handleDeleteOAuth(id: number): void;
  setPage: React.Dispatch<React.SetStateAction<AuthenticationPages>>;
  setSelectedOAuth: React.Dispatch<React.SetStateAction<number>>;
}

const OAuthProviderItem = ({
  oAuth,
  handleToggleEnabledOAuth,
  handleDeleteOAuth,
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
            onClick={() => handleToggleEnabledOAuth(oAuth.id, !oAuth.isEnabled)}
            checked={oAuth.isEnabled}
            htmlId={`oAuth${oAuth.name}EnabledSwitch`}
          />
        </div>
      </div>
    </div>

    <div className="oAuthActions">
      <CopyToClipboardButton
        label={I18n.t('site_settings.authentication.copy_url')}
        textToCopy={oAuth.callbackUrl}
      />
      <Separator />
      <a onClick={() =>
        window.open(`/o_auths/${oAuth.id}/start?reason=test`, '', 'width=640, height=640')
      }>
        Test
      </a>
      <Separator />
      <a onClick={() => {
        setSelectedOAuth(oAuth.id);
        setPage('edit');
      }}>
        { I18n.t('common.buttons.edit') }
      </a>
      <Separator />
      <a onClick={() => confirm(I18n.t('common.confirmation')) && handleDeleteOAuth(oAuth.id)}>
        { I18n.t('common.buttons.delete') }
      </a>
    </div>
  </li>
);

export default OAuthProviderItem;