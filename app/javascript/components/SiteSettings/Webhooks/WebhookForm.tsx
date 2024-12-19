import * as React from 'react';
import I18n from 'i18n-js';
import { SubmitHandler, useFieldArray, useForm } from 'react-hook-form';

import { IWebhook, WEBHOOK_HTTP_METHOD_DELETE, WEBHOOK_HTTP_METHOD_PATCH, WEBHOOK_HTTP_METHOD_POST, WEBHOOK_HTTP_METHOD_PUT, WEBHOOK_TRIGGER_DELETED_POST, WEBHOOK_TRIGGER_NEW_COMMENT, WEBHOOK_TRIGGER_NEW_POST, WEBHOOK_TRIGGER_NEW_POST_PENDING_APPROVAL, WEBHOOK_TRIGGER_NEW_USER, WEBHOOK_TRIGGER_NEW_VOTE, WEBHOOK_TRIGGER_POST_STATUS_CHANGE, WebhookHttpMethod, WebhookTrigger } from '../../../interfaces/IWebhook';
import { WebhookPages } from './WebhooksSiteSettingsP';
import ActionLink from '../../common/ActionLink';
import { AddIcon, BackIcon, DeleteIcon, LiquidIcon, PreviewIcon } from '../../common/Icons';
import { getLabel, getValidationMessage } from '../../../helpers/formUtils';
import { DangerText } from '../../common/CustomTexts';
import Button from '../../common/Button';
import { URL_REGEX_WHITESPACE_ALLOWED } from '../../../constants/regex';
import Spinner from '../../common/Spinner';
import buildRequestHeaders from '../../../helpers/buildRequestHeaders';
import HttpStatus from '../../../constants/http_status';
import { useRef, useState } from 'react';
import TemplateVariablesSelector from './TemplateVariablesSelector';

interface Props {
  isSubmitting: boolean;
  submitError: string;

  selectedWebhook: IWebhook;
  page: WebhookPages;
  setPage: React.Dispatch<React.SetStateAction<WebhookPages>>;

  handleSubmitWebhook(webhook: IWebhook): void;
  handleUpdateWebhook(id: number, form: ISiteSettingsWebhookFormUpdate): void;

  authenticityToken: string;
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
  isSubmitting,
  submitError,
  selectedWebhook,
  page,
  setPage,
  handleSubmitWebhook,
  handleUpdateWebhook,
  authenticityToken,
}: Props) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isDirty },
    watch,
    getValues,
    setValue,
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
    // Remove empty headers
    let httpHeaders = data.httpHeaders.filter(header => header.key !== '' && header.value !== '');
    
    const webhook = {
      isEnabled: false,
      name: data.name,
      description: data.description,
      trigger: data.trigger as WebhookTrigger,
      url: data.url.replace(/\s/g, ''),
      httpBody: data.httpBody,
      httpMethod: data.httpMethod as WebhookHttpMethod,
      httpHeaders: JSON.stringify(httpHeaders),
    };
    
    if (page === 'new') {
      handleSubmitWebhook(webhook);
    } else if (page === 'edit') {
      handleUpdateWebhook(selectedWebhook.id, webhook);
    }
  };

  const trigger = watch('trigger');
  const url = watch('url');
  const httpBody = watch('httpBody');

  const httpBodyTextAreaRef = useRef(null);
  const [cursorPosition, setCursorPosition] = React.useState(0);

  const handleCursorPosition = e => {
    setCursorPosition(e.target.selectionStart);
  };

  // Insert custom string at the last cursor position
  const insertString = (stringToInsert: string) => {
    const currentValue = getValues('httpBody'); // Get the current textarea value
    const start = currentValue.slice(0, cursorPosition);
    const end = currentValue.slice(cursorPosition);
    const newValue = start + stringToInsert + end;

    // Update textarea value with react-hook-form
    setValue('httpBody', newValue, { shouldDirty: true });
    setIsPreviewOutdated(true);

    // Update cursor position after the custom string
    const newCursorPosition = cursorPosition + stringToInsert.length;
    setCursorPosition(newCursorPosition);

    // Update the DOM to reflect the cursor position
    if (httpBodyTextAreaRef.current) {
      setTimeout(() => {
        httpBodyTextAreaRef.current.setSelectionRange(newCursorPosition, newCursorPosition);
        httpBodyTextAreaRef.current.focus();
      }, 0);
    }
  };

  // State for URL and body preview
  const [isPreviewVisible, setIsPreviewVisible] = useState(false);
  const [previewContent, setPreviewContent] = useState('');
  const [isPreviewOutdated, setIsPreviewOutdated] = useState(true);

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
          <label htmlFor="url">
            { getLabel('webhook', 'url') }
            &nbsp;
            { <LiquidIcon /> }
          </label>
          <input
            {...register('url', {
              required: true,
              pattern: URL_REGEX_WHITESPACE_ALLOWED,
              onChange: () => setIsPreviewOutdated(true),
            })}
            autoComplete="off"
            id="url"
            className="formControl"
          />
          <DangerText>{errors.url?.type === 'required' && getValidationMessage(errors.url.type, 'webhook', 'url')}</DangerText>
          <DangerText>{errors.url?.type === 'pattern' && I18n.t('common.validations.url')}</DangerText>
        </div>
      </div>

      <div className="formGroup">
        <label htmlFor="httpBody">
          { getLabel('webhook', 'http_body') }
          &nbsp;
          { <LiquidIcon /> }
        </label>
        <textarea
          {...register('httpBody', {
            onChange: () => setIsPreviewOutdated(true)
          })}
          ref={(e) => {
            register('httpBody').ref(e); // Combine react-hook-form's ref with custom ref
            httpBodyTextAreaRef.current = e; // Store a local reference
          }}
          onClick={handleCursorPosition}
          onKeyUp={handleCursorPosition}
          id="httpBody"
          className="formControl"
        />

        <div className="httpBodyActions">
          <TemplateVariablesSelector webhookTrigger={trigger} onChange={insertString} />

          <ActionLink
            icon={<PreviewIcon />}
            onClick={async () => {
              if ((url === '' && httpBody === '') || !isPreviewOutdated) return;

              const res = await fetch(`/webhooks_preview`, {
                method: 'PUT',
                headers: buildRequestHeaders(authenticityToken),
                body: JSON.stringify({
                  webhook: {
                    trigger: trigger,
                    url: url,
                    http_body: httpBody,
                  }
                }),
              });

              const json = await res.json();

              if (res.status === HttpStatus.OK) {
                setPreviewContent(
                  getLabel('webhook', 'url') + ":\n" +
                  json.url_preview + "\n\n" +
                  getLabel('webhook', 'http_body') + ":\n" +
                  json.http_body_preview
                );
              } else {
                setPreviewContent(
                  I18n.t('site_settings.webhooks.form.preview_error') + "\n" +
                  json.error
                )
              }

              setIsPreviewOutdated(false);
              setIsPreviewVisible(true);
            }}
            disabled={(url === '' && httpBody === '') || !isPreviewOutdated}
            customClass="previewHttpBody"
          >
            {I18n.t('common.buttons.preview')}
          </ActionLink>
        </div>

        {
          isPreviewVisible && 
            <div className="urlAndHttpBodyPreview">
              <label>{ I18n.t('common.buttons.preview') }</label>
              <pre id="preview">{previewContent}</pre>
            </div>
        }
      </div>

      <div className="formGroup formGroupHttpHeaders">
          {
            fields.map((field, index) => (
              <div className="formRow" key={field.id}>
                <div className="formGroup col-5">
                  <label htmlFor={`httpHeaders${index+1}Key`}>{ I18n.t('site_settings.webhooks.form.header_n_key', { n: index+1 }) }</label>
                  <input
                    {...register(`httpHeaders.${index}.key`, { required: (index!==0) })}
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
                    {...register(`httpHeaders.${index}.value`, { required: (index!==0) })}
                    autoComplete="off"
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
          isSubmitting ?
            <Spinner color="light" />
          :
          page === 'new' ?
            I18n.t('common.buttons.create')
          :
            I18n.t('common.buttons.update')
        }
      </Button>
    </form>
    
    { submitError && <p style={{marginTop: '1rem', marginBottom: '0'}}><DangerText>{submitError}</DangerText></p> }
    </>
  );
}

export default WebhookFormPage;