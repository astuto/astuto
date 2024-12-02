import * as React from 'react';
import I18n from 'i18n-js';

import Box from '../../common/Box';
import { WebhooksState } from '../../../reducers/webhooksReducer';
import { WebhookPages } from './WebhooksSiteSettingsP';
import Button from '../../common/Button';
import WebhooksList from './WebhooksList';
import SiteSettingsInfoBox from '../../common/SiteSettingsInfoBox';

interface Props {
  webhooks: WebhooksState;
  isSubmitting: boolean;
  submitError: string;
  
  handleToggleEnabledWebhook: (id: number, enabled: boolean) => void;
  handleDeleteWebhook: (id: number) => void;

  setSelectedWebhook: React.Dispatch<React.SetStateAction<number>>;
  setPage: React.Dispatch<React.SetStateAction<WebhookPages>>;
}

const WebhooksIndexPage = ({
  webhooks,
  isSubmitting,
  submitError,
  handleToggleEnabledWebhook,
  handleDeleteWebhook,
  setSelectedWebhook,
  setPage,
}: Props) => {
  return (
    <>
    <Box customClass="webhooksIndexPage">
      <div className="webhooksTitle">
        <h2>{I18n.t('site_settings.webhooks.title')}</h2>
      
        <Button onClick={() => setPage('new')}>
          { I18n.t('common.buttons.new') }
        </Button>
      </div>

      <WebhooksList
        webhooks={webhooks.items}
        handleToggleEnabledWebhook={handleToggleEnabledWebhook}
        handleDeleteWebhook={handleDeleteWebhook}
        setSelectedWebhook={setSelectedWebhook}
        setPage={setPage}
      />
    </Box>

    <SiteSettingsInfoBox
      areUpdating={webhooks.areLoading || isSubmitting}
      error={webhooks.error || submitError}
    />
    </>
  );
};

export default WebhooksIndexPage;