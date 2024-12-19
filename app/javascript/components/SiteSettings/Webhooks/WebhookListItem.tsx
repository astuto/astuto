import * as React from 'react';
import I18n from 'i18n-js';

import { IWebhook } from '../../../interfaces/IWebhook';
import { WebhookPages } from './WebhooksSiteSettingsP';
import Switch from '../../common/Switch';
import ActionLink from '../../common/ActionLink';
import { DeleteIcon, EditIcon, TestIcon } from '../../common/Icons';
import buildRequestHeaders from '../../../helpers/buildRequestHeaders';

const WEBHOOK_DESCRIPTION_MAX_LENGTH = 100;

interface Props {
  webhook: IWebhook;

  handleToggleEnabledWebhook: (id: number, enabled: boolean) => void;
  handleDeleteWebhook: (id: number) => void;
  handleTestWebhook: (id: number) => void;

  setSelectedWebhook: React.Dispatch<React.SetStateAction<number>>;
  setPage: React.Dispatch<React.SetStateAction<WebhookPages>>;
}

const WebhookListItem = ({
  webhook,
  handleToggleEnabledWebhook,
  handleDeleteWebhook,
  handleTestWebhook,
  setSelectedWebhook,
  setPage,
}: Props) => (
  <li className="webhookListItem">
    <div className="webhookInfo">
      <div className="webhookNameAndEnabled">
        <div className="webhookName">{webhook.name}</div>

        { webhook.description && 
          <p className="webhookDescription">
            {
              webhook.description.length > WEBHOOK_DESCRIPTION_MAX_LENGTH ?
                `${webhook.description.slice(0, WEBHOOK_DESCRIPTION_MAX_LENGTH)}...`
              :
                webhook.description
            }
          </p>
        }

        <Switch
          label={I18n.t(`common.${webhook.isEnabled ? 'enabled' : 'disabled'}`)}
          onClick={() => handleToggleEnabledWebhook(webhook.id, !webhook.isEnabled)}
          checked={webhook.isEnabled}
          htmlId={`webhook${webhook.name}EnabledSwitch`}
        />
      </div>
    </div>

    <div className="webhookActions">
      <ActionLink
        onClick={() => handleTestWebhook(webhook.id)}
        icon={<TestIcon />}
        customClass='testAction'
      >
        {I18n.t('common.buttons.test')}
      </ActionLink>
      
      <ActionLink
        onClick={() => {
          setSelectedWebhook(webhook.id);
          setPage('edit');
        }}
        icon={<EditIcon />}
        customClass="editAction"
      >
        {I18n.t('common.buttons.edit')}
      </ActionLink>

      <ActionLink
        onClick={() => confirm(I18n.t('common.confirmation')) && handleDeleteWebhook(webhook.id)}
        icon={<DeleteIcon />}
        customClass="deleteAction"
      >
        {I18n.t('common.buttons.delete')}
      </ActionLink>
    </div>
  </li>
);

export default WebhookListItem;