import * as React from 'react';
import I18n from 'i18n-js';

import { IOAuth } from '../../../interfaces/IOAuth';
import Switch from '../../common/Switch';
import Separator from '../../common/Separator';
import { AuthenticationPages } from './AuthenticationSiteSettingsP';
import CopyToClipboardButton from '../../common/CopyToClipboardButton';
import ActionLink from '../../common/ActionLink';
import { DeleteIcon, EditIcon, TestIcon } from '../../common/Icons';

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
      
      <ActionLink
        onClick={() =>
          window.open(`/o_auths/${oAuth.id}/start?reason=test`, '', 'width=640, height=640')
        }
        icon={<TestIcon />}
        customClass='testAction'
      >
        {I18n.t('common.buttons.test')}
      </ActionLink>
      
      <ActionLink
        onClick={() => {
          setSelectedOAuth(oAuth.id);
          setPage('edit');
        }}
        icon={<EditIcon />}
        customClass='editAction'
      >
        {I18n.t('common.buttons.edit')}
      </ActionLink>
      
      <ActionLink
        onClick={() => confirm(I18n.t('common.confirmation')) && handleDeleteOAuth(oAuth.id)}
        icon={<DeleteIcon />}
        customClass='deleteAction'
      >
        {I18n.t('common.buttons.delete')}
      </ActionLink>
    </div>
  </li>
);

export default OAuthProviderItem;