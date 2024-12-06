import * as React from 'react';
import { useState, useEffect } from 'react';

import { WebhooksState } from '../../../reducers/webhooksReducer';
import WebhooksIndexPage from './WebhooksIndexPage';
import WebhookFormPage from './WebhookFormPage';
import { IWebhook } from '../../../interfaces/IWebhook';
import HttpStatus from '../../../constants/http_status';
import { ISiteSettingsWebhookFormUpdate } from './WebhookForm';

interface Props {
  webhooks: WebhooksState;
  isSubmitting: boolean;
  submitError: string;

  requestWebhooks(): void;
  onSubmitWebhook(webhook: IWebhook, authenticityToken: string): Promise<any>;
  onUpdateWebhook(id: number, form: ISiteSettingsWebhookFormUpdate, authenticityToken: string): Promise<any>;
  onToggleEnabledWebhook(id: number, isEnabled: boolean, authenticityToken: string): void;
  onDeleteWebhook(id: number, authenticityToken: string): void;

  authenticityToken: string;
}

export type WebhookPages = 'index' | 'new' | 'edit';

const WebhooksSiteSettingsP = ({
  webhooks,
  isSubmitting,
  submitError,
  requestWebhooks,
  onSubmitWebhook,
  onUpdateWebhook,
  onToggleEnabledWebhook,
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

  const handleUpdateWebhook = (id: number, form: ISiteSettingsWebhookFormUpdate) => {
    onUpdateWebhook(id, form, authenticityToken).then(res => {
      if (res?.status === HttpStatus.OK) setPage('index');
    });
  };

  const handleToggleEnabledWebhook = (id: number, enabled: boolean) => {
    onToggleEnabledWebhook(id, enabled, authenticityToken);
  };

  const handleDeleteWebhook = (id: number) => {
    onDeleteWebhook(id, authenticityToken);
  };

  return (
    page === 'index' ?
      <WebhooksIndexPage
        webhooks={webhooks}
        isSubmitting={isSubmitting}
        submitError={submitError}
        handleToggleEnabledWebhook={handleToggleEnabledWebhook}
        handleDeleteWebhook={handleDeleteWebhook}
        setSelectedWebhook={setSelectedWebhook}
        setPage={setPage}
      />
    :
      <WebhookFormPage
        isSubmitting={isSubmitting}
        submitError={submitError}
        handleSubmitWebhook={handleSubmitWebhook}
        handleUpdateWebhook={handleUpdateWebhook}
        selectedWebhook={webhooks.items.find(webhook => webhook.id === selectedWebhook)}
        page={page}
        setPage={setPage}
      />
  );
};

export default WebhooksSiteSettingsP;