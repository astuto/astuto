import * as React from 'react';
import I18n from 'i18n-js';
import { WebhooksState } from '../../../reducers/webhooksReducer';
import { WebhookPages } from './WebhooksSiteSettingsP';
import { IWebhook } from '../../../interfaces/IWebhook';
import WebhookListItem from './WebhookListItem';

interface Props {
  webhooks: Array<IWebhook>;

  handleDeleteWebhook: (id: number) => void;

  setSelectedWebhook: React.Dispatch<React.SetStateAction<number>>;
  setPage: React.Dispatch<React.SetStateAction<WebhookPages>>;
}

const WebhooksList = ({
  webhooks,
  handleDeleteWebhook,
  setSelectedWebhook,
  setPage,
}: Props) => {
  // from webhooks, get a unique list of triggers
  const triggers = Array.from(new Set(webhooks.map(webhook => webhook.trigger)));

  return (
    <div className="webhooksList">
      {
        triggers.map((trigger, i) => (
          <div key={i}>
            <h4>{I18n.t(`site_settings.webhooks.triggers.${trigger}`)}</h4>

            <ul>
              {
                webhooks.filter(webhook => webhook.trigger === trigger).map((webhook, j) => (
                  <WebhookListItem
                    webhook={webhook}
                    handleDeleteWebhook={handleDeleteWebhook}
                    setSelectedWebhook={setSelectedWebhook}
                    setPage={setPage}
                    key={j}
                  />
                ))
              }
            </ul>
          </div>
        ))
      }
    </div>
  );
};

export default WebhooksList;