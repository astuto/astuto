import * as React from 'react';

import { WebhookPages } from './WebhooksSiteSettingsP';
import Box from '../../common/Box';
import { IWebhook } from '../../../interfaces/IWebhook';
import WebhookForm, { ISiteSettingsWebhookFormUpdate } from './WebhookForm';

interface Props {
  isSubmitting: boolean;
  submitError: string;

  handleSubmitWebhook(webhook: IWebhook): void;
  handleUpdateWebhook(id: number, form: ISiteSettingsWebhookFormUpdate): void;

  selectedWebhook: IWebhook;
  page: WebhookPages;
  setPage: React.Dispatch<React.SetStateAction<WebhookPages>>;

  authenticityToken: string;
}

const WebhookFormPage = ({
  isSubmitting,
  submitError,
  handleSubmitWebhook,
  handleUpdateWebhook,
  selectedWebhook,
  page,
  setPage,
  authenticityToken,
}: Props) => (
  <>
    <Box customClass="webhookFormPage">
      <WebhookForm
        isSubmitting={isSubmitting}
        submitError={submitError}
        handleSubmitWebhook={handleSubmitWebhook}
        handleUpdateWebhook={handleUpdateWebhook}
        selectedWebhook={selectedWebhook}
        page={page}
        setPage={setPage}
        authenticityToken={authenticityToken}
      />
    </Box>
  </>
);

export default WebhookFormPage;