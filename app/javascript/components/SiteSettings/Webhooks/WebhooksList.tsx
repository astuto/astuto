import * as React from 'react';
import I18n from 'i18n-js';
import { WebhooksState } from '../../../reducers/webhooksReducer';
import { WebhookPages } from './WebhooksSiteSettingsP';
import { IWebhook } from '../../../interfaces/IWebhook';
import WebhookListItem from './WebhookListItem';

interface Props {
  webhooks: Array<IWebhook>;

  setSelectedWebhook: React.Dispatch<React.SetStateAction<number>>;
  setPage: React.Dispatch<React.SetStateAction<WebhookPages>>;
}

const WebhooksList = ({
  webhooks,
  setSelectedWebhook,
  setPage,
}: Props) => {
  return (
    <div className="webhooksList">
      <ul>
        {
          webhooks.map((webhook, i) => (
            <WebhookListItem
              webhook={webhook}
              setSelectedWebhook={setSelectedWebhook}
              setPage={setPage}
              key={i}
            />
          ))
        }
      </ul>
    </div>
  );
};

export default WebhooksList;