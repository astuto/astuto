import * as React from 'react';
import I18n from 'i18n-js';
import { SubmitHandler, useFieldArray, useForm } from 'react-hook-form';

import { IWebhook, WEBHOOK_HTTP_METHOD_DELETE, WEBHOOK_HTTP_METHOD_PATCH, WEBHOOK_HTTP_METHOD_POST, WEBHOOK_HTTP_METHOD_PUT, WEBHOOK_TRIGGER_DELETED_POST, WEBHOOK_TRIGGER_NEW_COMMENT, WEBHOOK_TRIGGER_NEW_POST, WEBHOOK_TRIGGER_NEW_POST_PENDING_APPROVAL, WEBHOOK_TRIGGER_NEW_USER, WEBHOOK_TRIGGER_NEW_VOTE, WEBHOOK_TRIGGER_POST_STATUS_CHANGE, WebhookHttpMethod, WebhookTrigger } from '../../../interfaces/IWebhook';
import { WebhookPages } from './WebhooksSiteSettingsP';
import ActionLink from '../../common/ActionLink';
import { AddIcon, BackIcon, DeleteIcon } from '../../common/Icons';
import { getLabel, getValidationMessage } from '../../../helpers/formUtils';
import { DangerText } from '../../common/CustomTexts';
import Button from '../../common/Button';
import { URL_REGEX } from '../../../constants/regex';

interface Props {
  selectedWebhook: IWebhook;
  page: WebhookPages;
  setPage: React.Dispatch<React.SetStateAction<WebhookPages>>;

  handleSubmitWebhook(webhook: IWebhook): void;
  handleUpdateWebhook(id: number, form: ISiteSettingsWebhookFormUpdate): void;
}

interface ISiteSettingsWebhookFormBase {
  name: string;
  description: string;
  trigger: string;
  url: string;
  httpBody: string;
  httpMethod: string;
}

interface ISiteSettingsWebhookForm extends ISiteSettingsWebhookFormBase {
  httpHeaders: Array<{ key: string, value: string }>;
}

export interface ISiteSettingsWebhookFormUpdate extends ISiteSettingsWebhookFormBase {
  httpHeaders: string;
}

// This method tries to parse httpHeaders JSON, otherwise returns [{ key: '', value: '' }]
const parseHttpHeaders = (httpHeaders: string) => {
  try {
    return JSON.parse(httpHeaders);
  } catch (e) {
    return [{ key: '', value: '' }];
  }
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
    control,
    formState: { errors, isDirty }
  } = useForm<ISiteSettingsWebhookForm>({
    defaultValues: page === 'new' ? {
      name: '',
      description: '',
      trigger: WEBHOOK_TRIGGER_NEW_POST,
      url: '',
      httpBody: '',
      httpMethod: WEBHOOK_HTTP_METHOD_POST,
      httpHeaders: [{ key: '', value: '' }],
    } : {
      name: selectedWebhook.name,
      description: selectedWebhook.description,
      trigger: selectedWebhook.trigger,
      url: selectedWebhook.url,
      httpBody: selectedWebhook.httpBody,
      httpMethod: selectedWebhook.httpMethod,
      httpHeaders: parseHttpHeaders(selectedWebhook.httpHeaders),
    }
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'httpHeaders', // The name of the httpHeaders field
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
      httpHeaders: JSON.stringify(data.httpHeaders),
    };
    
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
            {...register('name', { required: true, maxLength: 255 })}
            id="name"
            className="formControl"
          />
          <DangerText>{errors.name?.type === 'required' && getValidationMessage(errors.name.type, 'webhook', 'name')}</DangerText>
          <DangerText>{errors.name?.type === 'maxLength' && (getLabel('webhook', 'name') + ' ' + I18n.t('activerecord.errors.messages.too_long', { count: 255 }))}</DangerText>
        </div>

        <div className="formGroup col-6">
          <label htmlFor="description">{ getLabel('webhook', 'description') }</label>
          <input
            {...register('description', { maxLength: 255 })}
            id="description"
            className="formControl"
          />
          <DangerText>{errors.description?.type === 'maxLength' && (getLabel('webhook', 'description') + ' ' + I18n.t('activerecord.errors.messages.too_long', { count: 255 }))}</DangerText>
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
            {I18n.t('site_settings.webhooks.triggers.delete_post')}
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
            {...register('url', { required: true, pattern: URL_REGEX })}
            id="url"
            className="formControl"
          />
          <DangerText>{errors.url?.type === 'required' && getValidationMessage(errors.url.type, 'webhook', 'url')}</DangerText>
          <DangerText>{errors.url?.type === 'pattern' && I18n.t('common.validations.url')}</DangerText>
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

      <div className="formGroup formGroupHttpHeaders">
          {
            fields.map((field, index) => (
              <div className="formRow" key={field.id}>
                <div className="formGroup col-5">
                  <label htmlFor={`httpHeaders${index+1}Key`}>{ I18n.t('site_settings.webhooks.form.header_n_key', { n: index+1 }) }</label>
                  <input
                    {...register(`httpHeaders.${index}.key`, { required: true })}
                    id={`httpHeaders${index+1}Key`}
                    className="formControl"
                  />
                  <DangerText>
                    {errors.httpHeaders && errors.httpHeaders[index]?.key?.type === 'required' && getValidationMessage(errors.httpHeaders[index]?.key?.type, 'webhook', 'http_headers')}
                  </DangerText>
                </div>

                <div className="formGroup col-5">
                  <label htmlFor={`httpHeaders${index+1}Value`}>{ I18n.t('site_settings.webhooks.form.header_n_value', { n: index+1 }) }</label>
                  <input
                    {...register(`httpHeaders.${index}.value`, { required: true })}
                    id={`httpHeaders${index+1}Value`}
                    className="formControl"
                  />
                  <DangerText>
                    {errors.httpHeaders && errors.httpHeaders[index]?.value?.type === 'required' && getValidationMessage(errors.httpHeaders[index]?.value?.type, 'webhook', 'http_headers')}
                  </DangerText>
                </div>

                <div className="formGroup col-2 deleteHeaderActionLinkContainer">
                  <ActionLink icon={<DeleteIcon />} onClick={() => remove(index)}>
                    {I18n.t('common.buttons.delete')}
                  </ActionLink>
                </div>
              </div>
            ))
          }
      </div>
      <ActionLink icon={<AddIcon />} onClick={() => append({ key: "", value: "" })}>
        {I18n.t('site_settings.webhooks.form.add_header')}
      </ActionLink>

      <Button onClick={() => null} type="submit" className="submitWebhookFormButton">
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