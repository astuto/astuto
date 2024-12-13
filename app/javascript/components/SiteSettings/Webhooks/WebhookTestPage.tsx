import * as React from 'react';
import I18n from 'i18n-js';

import Box from '../../common/Box';
import { IWebhook } from '../../../interfaces/IWebhook';
import { WebhookPages } from './WebhooksSiteSettingsP';
import ActionLink from '../../common/ActionLink';
import { BackIcon, EditIcon, TestIcon } from '../../common/Icons';
import buildRequestHeaders from '../../../helpers/buildRequestHeaders';
import Badge, { BADGE_TYPE_DANGER, BADGE_TYPE_SUCCESS } from '../../common/Badge';

interface Props {
  selectedWebhook: IWebhook;
  testHttpCode: number;
  testHttpResponse: string;
  
  setSelectedWebhook: React.Dispatch<React.SetStateAction<number>>;
  setPage: React.Dispatch<React.SetStateAction<WebhookPages>>;

  handleTestWebhook: (id: number) => void;
}

const WebhookTestPage = ({
  selectedWebhook,
  testHttpCode,
  testHttpResponse,
  setSelectedWebhook,
  setPage,
  handleTestWebhook,
}: Props) => (
  <Box customClass="webhookTestPage">
    <ActionLink
      onClick={() => setPage('index') }
      icon={<BackIcon />}
      customClass="backButton"
    >
      {I18n.t('common.buttons.back')}
    </ActionLink>

    <div className="webhookTestTitle">
      <h2>{I18n.t('site_settings.webhooks.test_page.title')}</h2>
    </div>

    <div className="webhookTestContent">
      <div className="webhookTestInfo">
        <p>
          <b>{I18n.t('activerecord.models.webhook', { count: 1 })}</b>:&nbsp;
          <span>{selectedWebhook.name}</span>
        </p>
        
        <div className="webhookActions">
          <ActionLink
            onClick={() => handleTestWebhook(selectedWebhook.id)}
            icon={<TestIcon />}
            customClass='testAction'
          >
            {I18n.t('common.buttons.test')}
          </ActionLink>
          
          <ActionLink
            onClick={() => {
              setSelectedWebhook(selectedWebhook.id);
              setPage('edit');
            }}
            icon={<EditIcon />}
            customClass="editAction"
          >
            {I18n.t('common.buttons.edit') + ' ' + I18n.t('activerecord.models.webhook', { count: 1 })}
          </ActionLink>
        </div>
      </div>

      <div className="webhookTestResponse">
        <Badge type={Array.from({length: 100}, (_, i) => i + 200).includes(testHttpCode) ? BADGE_TYPE_SUCCESS : BADGE_TYPE_DANGER}>
          {testHttpCode.toString()}
        </Badge>

        <pre id="testHttpResponse">{testHttpResponse}</pre>
      </div>
    </div>
  </Box>
);

export default WebhookTestPage;