import * as React from 'react';
import I18n from 'i18n-js';
import { WebhookPages } from './WebhooksSiteSettingsP';
import { IWebhook } from '../../../interfaces/IWebhook';
import WebhookListItem from './WebhookListItem';
import { CenteredMutedText } from '../../common/CustomTexts';
import Spinner from '../../common/Spinner';

interface Props {
  webhooks: Array<IWebhook>;
  webhooksAreLoading: boolean;

  handleToggleEnabledWebhook: (id: number, enabled: boolean) => void;
  handleDeleteWebhook: (id: number) => void;
  handleTestWebhook: (id: number) => void;

  setSelectedWebhook: React.Dispatch<React.SetStateAction<number>>;
  setPage: React.Dispatch<React.SetStateAction<WebhookPages>>;
}

const WebhooksList = ({
  webhooks,
  webhooksAreLoading,
  handleToggleEnabledWebhook,
  handleDeleteWebhook,
  handleTestWebhook,
  setSelectedWebhook,
  setPage,
}: Props) => {
  // from webhooks, get a unique list of triggers
  const triggers = Array.from(new Set(webhooks.map(webhook => webhook.trigger)));

  if (webhooksAreLoading) return <Spinner />;

  return (
    <div className="webhooksList">
      {
        (webhooks && webhooks.length > 0) ?
          triggers.map((trigger, i) => (
            <div key={i}>
              <h4>{I18n.t(`site_settings.webhooks.triggers.${trigger}`)}</h4>

              <ul>
                {
                  webhooks.filter(webhook => webhook.trigger === trigger).map((webhook, j) => (
                    <WebhookListItem
                      webhook={webhook}
                      handleToggleEnabledWebhook={handleToggleEnabledWebhook}
                      handleDeleteWebhook={handleDeleteWebhook}
                      handleTestWebhook={handleTestWebhook}
                      setSelectedWebhook={setSelectedWebhook}
                      setPage={setPage}
                      key={j}
                    />
                  ))
                }
              </ul>
            </div>
          ))
        :
          <CenteredMutedText>{I18n.t('site_settings.webhooks.empty')}</CenteredMutedText>
      }
    </div>
  );
};

export default WebhooksList;