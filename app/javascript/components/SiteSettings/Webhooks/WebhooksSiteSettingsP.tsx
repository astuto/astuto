import * as React from 'react';
import { useState, useEffect } from 'react';

import { WebhooksState } from '../../../reducers/webhooksReducer';
import WebhooksIndexPage from './WebhooksIndexPage';
import WebhookFormPage from './WebhookFormPage';
import { IWebhook } from '../../../interfaces/IWebhook';
import HttpStatus from '../../../constants/http_status';

interface Props {
  webhooks: WebhooksState;

  requestWebhooks(): void;
  onSubmitWebhook(webhook: IWebhook, authenticityToken: string): Promise<any>;
  onDeleteWebhook(id: number, authenticityToken: string): void;

  authenticityToken: string;
}

export type WebhookPages = 'index' | 'new' | 'edit';

const WebhooksSiteSettingsP = ({
  webhooks,
  requestWebhooks,
  onSubmitWebhook,
  onDeleteWebhook,
  authenticityToken,
}: Props) => {
  const [page, setPage] = useState<WebhookPages>('index');
  const [selectedWebhook, setSelectedWebhook] = useState<number>(null);

  useEffect(requestWebhooks, []);

  const handleSubmitWebhook = (webhook: IWebhook) => {
    onSubmitWebhook(webhook, authenticityToken).then(res => {
      if (res?.status === HttpStatus.Created) setPage('index');
    });
  };

  const handleDeleteWebhook = (id: number) => {
    onDeleteWebhook(id, authenticityToken);
  }

  return (
    page === 'index' ?
      <WebhooksIndexPage
        webhooks={webhooks}
        handleDeleteWebhook={handleDeleteWebhook}
        setSelectedWebhook={setSelectedWebhook}
        setPage={setPage}
      />
    :
      <WebhookFormPage
        handleSubmitWebhook={handleSubmitWebhook}
        selectedWebhook={webhooks.items.find(webhook => webhook.id === selectedWebhook)}
        page={page}
        setPage={setPage}
      />
  );
};

export default WebhooksSiteSettingsP;