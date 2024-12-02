import * as React from 'react';
import I18n from 'i18n-js';

import { IWebhook } from '../../../interfaces/IWebhook';
import { WebhookPages } from './WebhooksSiteSettingsP';
import Switch from '../../common/Switch';
import ActionLink from '../../common/ActionLink';
import { DeleteIcon, EditIcon } from '../../common/Icons';

const WEBHOOK_DESCRIPTION_MAX_LENGTH = 100;

interface Props {
  webhook: IWebhook;

  handleDeleteWebhook: (id: number) => void;

  setSelectedWebhook: React.Dispatch<React.SetStateAction<number>>;
  setPage: React.Dispatch<React.SetStateAction<WebhookPages>>;
}

const WebhookListItem = ({
  webhook,
  handleDeleteWebhook,
  setSelectedWebhook,
  setPage
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
          onClick={() => console.log('clicked')}
          checked={webhook.isEnabled}
          htmlId={`webhook${webhook.name}EnabledSwitch`}
        />
      </div>
    </div>

    <div className="webhookActions">
      <ActionLink
        onClick={() => {
          setSelectedWebhook(webhook.id)
          setPage('edit')
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