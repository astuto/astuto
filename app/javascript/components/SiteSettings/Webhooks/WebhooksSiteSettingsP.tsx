import * as React from 'react';
import { useState, useEffect } from 'react';

import { WebhooksState } from '../../../reducers/webhooksReducer';
import WebhooksIndexPage from './WebhooksIndexPage';
import WebhookFormPage from './WebhookFormPage';
import { IWebhook } from '../../../interfaces/IWebhook';
import HttpStatus from '../../../constants/http_status';
import { ISiteSettingsWebhookFormUpdate } from './WebhookForm';
import WebhookTestPage from './WebhookTestPage';
import buildRequestHeaders from '../../../helpers/buildRequestHeaders';

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

export type WebhookPages = 'index' | 'new' | 'edit' | 'test';

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
  
  const [isTesting, setIsTesting] = useState<boolean>(false);
  const [testHttpCode, setTestHttpCode] = useState<number>(null);
  const [testHttpResponse, setTestHttpResponse] = useState<string>(null);

  useEffect(requestWebhooks, []);

  const handleSubmitWebhook = (webhook: IWebhook) => {
    onSubmitWebhook(webhook, authenticityToken).then(res => {
      if (res?.status === HttpStatus.Created) window.location.reload();
    });
  };

  const handleUpdateWebhook = (id: number, form: ISiteSettingsWebhookFormUpdate) => {
    onUpdateWebhook(id, form, authenticityToken).then(res => {
      if (res?.status === HttpStatus.OK) window.location.reload();
    });
  };

  const handleToggleEnabledWebhook = (id: number, enabled: boolean) => {
    onToggleEnabledWebhook(id, enabled, authenticityToken);
  };

  const handleDeleteWebhook = (id: number) => {
    onDeleteWebhook(id, authenticityToken);
  };

  const handleTestWebhook = async (id: number) => {
    setIsTesting(true);

    const res = await fetch(`/webhooks/${id}/test`, {
      method: 'PUT',
      headers: buildRequestHeaders(authenticityToken),
    });
    const json = await res.json();

    setTestHttpCode(res.status);
    setTestHttpResponse(JSON.stringify(json, null, 2));
    setSelectedWebhook(id);
    setPage('test');
    setIsTesting(false);
  };

  return (
    page === 'index' ?
      <WebhooksIndexPage
        webhooks={webhooks}
        isSubmitting={isSubmitting}
        isTesting={isTesting}
        submitError={submitError}
        handleToggleEnabledWebhook={handleToggleEnabledWebhook}
        handleDeleteWebhook={handleDeleteWebhook}
        handleTestWebhook={handleTestWebhook}
        setSelectedWebhook={setSelectedWebhook}
        setPage={setPage}
      />
    :
    (page === 'new' || page === 'edit') ?
      <WebhookFormPage
        isSubmitting={isSubmitting}
        submitError={submitError}
        handleSubmitWebhook={handleSubmitWebhook}
        handleUpdateWebhook={handleUpdateWebhook}
        selectedWebhook={webhooks.items.find(webhook => webhook.id === selectedWebhook)}
        page={page}
        setPage={setPage}
        authenticityToken={authenticityToken}
      />
    :
      <WebhookTestPage
        selectedWebhook={webhooks.items.find(webhook => webhook.id === selectedWebhook)}
        testHttpCode={testHttpCode}
        testHttpResponse={testHttpResponse}
        setSelectedWebhook={setSelectedWebhook}
        setPage={setPage}
        handleTestWebhook={handleTestWebhook}
      />
  );
};

export default WebhooksSiteSettingsP;