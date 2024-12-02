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

  setSelectedWebhook: React.Dispatch<React.SetStateAction<number>>;
  setPage: React.Dispatch<React.SetStateAction<WebhookPages>>;
}

const WebhooksIndexPage = ({
  webhooks,
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
        setSelectedWebhook={setSelectedWebhook}
        setPage={setPage}
      />
    </Box>
    <SiteSettingsInfoBox
      areUpdating={webhooks.areLoading}
      error={webhooks.error}
    />
    </>
  );
};

export default WebhooksIndexPage;