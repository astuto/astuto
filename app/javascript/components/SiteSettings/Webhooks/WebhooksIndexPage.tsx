import * as React from 'react';
import I18n from 'i18n-js';

import Box from '../../common/Box';
import { WebhooksState } from '../../../reducers/webhooksReducer';
import { WebhookPages } from './WebhooksSiteSettingsP';
import Button from '../../common/Button';
import WebhooksList from './WebhooksList';
import SiteSettingsInfoBox from '../../common/SiteSettingsInfoBox';
import ActionLink from '../../common/ActionLink';
import { LearnMoreIcon } from '../../common/Icons';

interface Props {
  webhooks: WebhooksState;
  isSubmitting: boolean;
  isTesting: boolean;
  submitError: string;
  
  handleToggleEnabledWebhook: (id: number, enabled: boolean) => void;
  handleDeleteWebhook: (id: number) => void;
  handleTestWebhook: (id: number) => void;

  setSelectedWebhook: React.Dispatch<React.SetStateAction<number>>;
  setPage: React.Dispatch<React.SetStateAction<WebhookPages>>;
}

const WebhooksIndexPage = ({
  webhooks,
  isSubmitting,
  isTesting,
  submitError,
  handleToggleEnabledWebhook,
  handleDeleteWebhook,
  handleTestWebhook,
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

      <p style={{textAlign: 'left'}}>
        <ActionLink
          onClick={() => window.open('https://docs.astuto.io/webhooks/webhooks-introduction/', '_blank')}
          icon={<LearnMoreIcon />}
        >
          {I18n.t('site_settings.webhooks.learn_more')}
        </ActionLink>
      </p>

      <WebhooksList
        webhooks={webhooks.items}
        webhooksAreLoading={webhooks.areLoading}
        handleToggleEnabledWebhook={handleToggleEnabledWebhook}
        handleDeleteWebhook={handleDeleteWebhook}
        handleTestWebhook={handleTestWebhook}
        setSelectedWebhook={setSelectedWebhook}
        setPage={setPage}
      />
    </Box>

    <SiteSettingsInfoBox
      areUpdating={webhooks.areLoading || isSubmitting || isTesting}
      error={webhooks.error || submitError}
    />
    </>
  );
};

export default WebhooksIndexPage;