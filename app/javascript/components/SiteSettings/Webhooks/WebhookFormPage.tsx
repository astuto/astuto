import * as React from 'react';

import { WebhookPages } from './WebhooksSiteSettingsP';
import Box from '../../common/Box';
import { IWebhook } from '../../../interfaces/IWebhook';
import WebhookForm from './WebhookForm';

interface Props {
  handleSubmitWebhook(webhook: IWebhook): void;
  selectedWebhook: IWebhook;
  page: WebhookPages;
  setPage: React.Dispatch<React.SetStateAction<WebhookPages>>;
}

const WebhookFormPage = ({
  handleSubmitWebhook,
  selectedWebhook,
  page,
  setPage,
}: Props) => (
  <>
    <Box customClass="webhookFormPage">
      <WebhookForm
        handleSubmitWebhook={handleSubmitWebhook}
        selectedWebhook={selectedWebhook}
        page={page}
        setPage={setPage}
      />
    </Box>
  </>
);

export default WebhookFormPage;