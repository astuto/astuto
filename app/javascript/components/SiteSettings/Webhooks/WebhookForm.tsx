import * as React from 'react';
import I18n from 'i18n-js';
import { SubmitHandler, useForm } from 'react-hook-form';

import { IWebhook, WEBHOOK_HTTP_METHOD_DELETE, WEBHOOK_HTTP_METHOD_PATCH, WEBHOOK_HTTP_METHOD_POST, WEBHOOK_HTTP_METHOD_PUT, WEBHOOK_TRIGGER_DELETED_POST, WEBHOOK_TRIGGER_NEW_COMMENT, WEBHOOK_TRIGGER_NEW_POST, WEBHOOK_TRIGGER_NEW_POST_PENDING_APPROVAL, WEBHOOK_TRIGGER_NEW_USER, WEBHOOK_TRIGGER_NEW_VOTE, WEBHOOK_TRIGGER_POST_STATUS_CHANGE, WebhookHttpMethod, WebhookTrigger } from '../../../interfaces/IWebhook';
import { WebhookPages } from './WebhooksSiteSettingsP';
import ActionLink from '../../common/ActionLink';
import { BackIcon } from '../../common/Icons';
import { getLabel, getValidationMessage } from '../../../helpers/formUtils';
import { DangerText } from '../../common/CustomTexts';
import Button from '../../common/Button';

interface Props {
  selectedWebhook: IWebhook;
  page: WebhookPages;
  setPage: React.Dispatch<React.SetStateAction<WebhookPages>>;

  handleSubmitWebhook(webhook: IWebhook): void;
  handleUpdateWebhook(id: number, form: ISiteSettingsWebhookForm): void;
}

export interface ISiteSettingsWebhookForm {
  name: string;
  description: string;
  trigger: string;
  url: string;
  httpBody: string;
  httpMethod: string;
  httpHeaders: string;
}

const WebhookFormPage = ({
  selectedWebhook,
  page,
  setPage,
  handleSubmitWebhook,
  handleUpdateWebhook,
}: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty }
  } = useForm<ISiteSettingsWebhookForm>({
    defaultValues: page === 'new' ? {
      name: '',
      description: '',
      trigger: WEBHOOK_TRIGGER_NEW_POST,
      url: '',
      httpBody: '',
      httpMethod: WEBHOOK_HTTP_METHOD_POST,
      httpHeaders: '',
    } : {
      name: selectedWebhook.name,
      description: selectedWebhook.description,
      trigger: selectedWebhook.trigger,
      url: selectedWebhook.url,
      httpBody: selectedWebhook.httpBody,
      httpMethod: selectedWebhook.httpMethod,
      httpHeaders: selectedWebhook.httpHeaders,
    }
  });

  const onSubmit: SubmitHandler<ISiteSettingsWebhookForm> = data => {
    const webhook = {
      isEnabled: false,
      name: data.name,
      description: data.description,
      trigger: data.trigger as WebhookTrigger,
      url: data.url,
      httpBody: data.httpBody,
      httpMethod: data.httpMethod as WebhookHttpMethod,
      httpHeaders: data.httpHeaders,
    }
    
    if (page === 'new') {
      handleSubmitWebhook(webhook);
    } else if (page === 'edit') {
      handleUpdateWebhook(selectedWebhook.id, webhook);
    }
  };

  return (
    <>
    <ActionLink
      onClick={() => {
        let confirmation = true;
        if (isDirty)
          confirmation = confirm(I18n.t('common.unsaved_changes') + ' ' + I18n.t('common.confirmation'));
        if (confirmation) setPage('index');
      }}
      icon={<BackIcon />}
      customClass="backButton"
    >
      {I18n.t('common.buttons.back')}
    </ActionLink>

    <h2>{ I18n.t(`site_settings.webhooks.form.title_${page}`) }</h2>
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="formRow">
        <div className="formGroup col-6">
          <label htmlFor="name">{ getLabel('webhook', 'name') }</label>
          <input
            {...register('name', { required: true })}
            id="name"
            className="formControl"
          />
          <DangerText>{errors.name && getValidationMessage(errors.name.type, 'webhook', 'name')}</DangerText>
        </div>

        <div className="formGroup col-6">
          <label htmlFor="description">{ getLabel('webhook', 'description') }</label>
          <input
            {...register('description')}
            id="description"
            className="formControl"
          />
        </div>
      </div>

      <div className="formGroup">
        <label htmlFor="trigger">{ getLabel('webhook', 'trigger') }</label>
        <select
          {...register('trigger')}
          id="trigger"
          className="selectPicker"
        >
          <option value={WEBHOOK_TRIGGER_NEW_POST}>
            {I18n.t('site_settings.webhooks.triggers.new_post')}
          </option>
          <option value={WEBHOOK_TRIGGER_NEW_POST_PENDING_APPROVAL}>
            {I18n.t('site_settings.webhooks.triggers.new_post_pending_approval')}
          </option>
          <option value={WEBHOOK_TRIGGER_DELETED_POST}>
            {I18n.t('site_settings.webhooks.triggers.deleted_post')}
          </option>
          <option value={WEBHOOK_TRIGGER_POST_STATUS_CHANGE}>
            {I18n.t('site_settings.webhooks.triggers.post_status_change')}
          </option>
          <option value={WEBHOOK_TRIGGER_NEW_COMMENT}>
            {I18n.t('site_settings.webhooks.triggers.new_comment')}
          </option>
          <option value={WEBHOOK_TRIGGER_NEW_VOTE}>
            {I18n.t('site_settings.webhooks.triggers.new_vote')}
          </option>
          <option value={WEBHOOK_TRIGGER_NEW_USER}>
            {I18n.t('site_settings.webhooks.triggers.new_user')}
          </option>
        </select>
        <DangerText>{errors.trigger && getValidationMessage(errors.trigger.type, 'webhook', 'trigger')}</DangerText>
      </div>

      <div className="formRow">
        <div className="formGroup col-3">
          <label htmlFor="httpMethod">{ getLabel('webhook', 'http_method') }</label>
          <select
            {...register('httpMethod')}
            id="httpMethod"
            className="selectPicker"
          >
            <option value={WEBHOOK_HTTP_METHOD_POST}>
              {I18n.t('site_settings.webhooks.http_methods.post')}
            </option>
            <option value={WEBHOOK_HTTP_METHOD_PUT}>
              {I18n.t('site_settings.webhooks.http_methods.put')}
            </option>
            <option value={WEBHOOK_HTTP_METHOD_PATCH}>
              {I18n.t('site_settings.webhooks.http_methods.patch')}
            </option>
            <option value={WEBHOOK_HTTP_METHOD_DELETE}>
              {I18n.t('site_settings.webhooks.http_methods.delete')}
            </option>
          </select>
        </div>

        <div className="formGroup col-9">
          <label htmlFor="url">{ getLabel('webhook', 'url') }</label>
          <input
            {...register('url', { required: true })}
            id="url"
            className="formControl"
          />
          <DangerText>{errors.url && getValidationMessage(errors.url.type, 'webhook', 'url')}</DangerText>
        </div>
      </div>

      <div className="formGroup">
        <label htmlFor="httpBody">{ getLabel('webhook', 'http_body') }</label>
        <textarea
          {...register('httpBody')}
          id="httpBody"
          className="formControl"
        />
      </div>

      <div className="formGroup">
        <label htmlFor="httpHeaders">{ getLabel('webhook', 'http_headers') }</label>
        <textarea
          {...register('httpHeaders')}
          id="httpHeaders"
          className="formControl"
        />
      </div>

      <Button onClick={() => null} type="submit">
        {
          page === 'new' ?
            I18n.t('common.buttons.create')
          :
            I18n.t('common.buttons.update')
        }
      </Button>
    </form>
    </>
  );
}

export default WebhookFormPage;