import * as React from 'react';

import { WebhookPages } from './WebhooksSiteSettingsP';
import Box from '../../common/Box';
import { IWebhook } from '../../../interfaces/IWebhook';
import WebhookForm, { ISiteSettingsWebhookFormUpdate } from './WebhookForm';

interface Props {
  handleSubmitWebhook(webhook: IWebhook): void;
  handleUpdateWebhook(id: number, form: ISiteSettingsWebhookFormUpdate): void;

  selectedWebhook: IWebhook;
  page: WebhookPages;
  setPage: React.Dispatch<React.SetStateAction<WebhookPages>>;
}

const WebhookFormPage = ({
  handleSubmitWebhook,
  handleUpdateWebhook,
  selectedWebhook,
  page,
  setPage,
}: Props) => (
  <>
    <Box customClass="webhookFormPage">
      <WebhookForm
        handleSubmitWebhook={handleSubmitWebhook}
        handleUpdateWebhook={handleUpdateWebhook}
        selectedWebhook={selectedWebhook}
        page={page}
        setPage={setPage}
      />
    </Box>
  </>
);

export default WebhookFormPage;