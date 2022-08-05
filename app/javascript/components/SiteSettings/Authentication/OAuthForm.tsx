import * as React from 'react';
import I18n from 'i18n-js';
import { SubmitHandler, useForm } from 'react-hook-form';
import { DangerText } from '../../common/CustomTexts';
import { getLabel, getValidationMessage } from '../../../helpers/formUtils';
import Button from '../../common/Button';
import { URL_REGEX } from '../../../constants/regex';
import { IOAuth } from '../../../interfaces/IOAuth';
import { AuthenticationPages } from './AuthenticationSiteSettingsP';
import { useState } from 'react';
import Separator from '../../common/Separator';

interface Props {
  selectedOAuth: IOAuth;
  page: AuthenticationPages;
  setPage: React.Dispatch<React.SetStateAction<AuthenticationPages>>;

  handleSubmitOAuth(oAuth: IOAuth): void;
  handleUpdateOAuth(id: number, form: ISiteSettingsOAuthForm): void;
}

export interface ISiteSettingsOAuthForm {
  name: string;
  logo: string;
  clientId: string;
  clientSecret: string;
  authorizeUrl: string;
  tokenUrl: string;
  profileUrl: string;
  scope: string;
  jsonUserEmailPath: string;
  jsonUserNamePath: string;
}

const OAuthForm = ({
  selectedOAuth,
  page,
  setPage,

  handleSubmitOAuth,
  handleUpdateOAuth,
}: Props) => {
  const [editClientSecret, setEditClientSecret] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty }
  } = useForm<ISiteSettingsOAuthForm>({
    defaultValues: page === 'new' ? {
      name: '',
      logo: '',
      clientId: '',
      clientSecret: '',
      authorizeUrl: '',
      tokenUrl: '',
      profileUrl: '',
      scope: '',
      jsonUserEmailPath: '',
      jsonUserNamePath: '',
    } : {
      name: selectedOAuth.name,
      logo: selectedOAuth.logo,
      clientId: selectedOAuth.clientId,
      clientSecret: selectedOAuth.clientSecret,
      authorizeUrl: selectedOAuth.authorizeUrl,
      tokenUrl: selectedOAuth.tokenUrl,
      profileUrl: selectedOAuth.profileUrl,
      scope: selectedOAuth.scope,
      jsonUserEmailPath: selectedOAuth.jsonUserEmailPath,
      jsonUserNamePath: selectedOAuth.jsonUserNamePath,
    },
  });

  const onSubmit: SubmitHandler<ISiteSettingsOAuthForm> = data => {
    const oAuth = { ...data, isEnabled: false };

    if (page === 'new') {
      handleSubmitOAuth(oAuth);
    } else if (page === 'edit') {
      if (editClientSecret === false) {
        delete oAuth.clientSecret;
      }

      handleUpdateOAuth(selectedOAuth.id, oAuth as ISiteSettingsOAuthForm);
    }
  };

  return (
    <>
    <a
      onClick={() => {
        let confirmation = true;
        if (isDirty)
          confirmation = confirm(I18n.t('common.unsaved_changes') + ' ' + I18n.t('common.confirmation'));
        if (confirmation) setPage('index');
      }}
      className="backButton link">
      ← { I18n.t('common.buttons.back') }
    </a>
    <h2>{ I18n.t(`site_settings.authentication.form.title_${page}`) }</h2>
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="formRow">
        <div className="formGroup col-6">
          <label htmlFor="name">{ getLabel('o_auth', 'name') }</label>
          <input
            {...register('name', { required: true })}
            id="name"
            className="formControl"
          />
          <DangerText>{errors.name && getValidationMessage(errors.name.type, 'o_auth', 'name')}</DangerText>
        </div>

        <div className="formGroup col-6">
          <label htmlFor="logo">{ getLabel('o_auth', 'logo') }</label>
          <input
            {...register('logo')}
            id="logo"
            className="formControl"
          />
        </div>
      </div>

      <h5>{ I18n.t('site_settings.authentication.form.subtitle_oauth_config') }</h5>
      <div className="formRow">
        <div className="formGroup col-6">
          <label htmlFor="clientId">{ getLabel('o_auth', 'client_id') }</label>
          <input
            {...register('clientId', { required: true })}
            id="clientId"
            className="formControl"
          />
          <DangerText>{errors.clientId && getValidationMessage(errors.clientId.type, 'o_auth', 'client_id')}</DangerText>
        </div>

        <div className="formGroup col-6">
          <label htmlFor="clientSecret">{ getLabel('o_auth', 'client_secret') }</label>
          <input
            {...register('clientSecret', { required: page === 'new' || (page === 'edit' && editClientSecret) })}
            id="clientSecret"
            className="formControl"
            disabled={page === 'edit' && editClientSecret === false}
          />
          {
            page === 'edit' &&
              <>
                <small>
                  {I18n.t('site_settings.authentication.form.client_secret_help') + "\t"}
                </small>
                <Separator />
                {
                  editClientSecret ?
                    <a onClick={() => setEditClientSecret(false)} className="link">{I18n.t('common.buttons.cancel')}</a>
                  :
                    <a onClick={() => setEditClientSecret(true)} className="link">{I18n.t('common.buttons.edit')}</a>
                }
                <br />
              </>
              
          }
          <DangerText>{errors.clientSecret && getValidationMessage(errors.clientSecret.type, 'o_auth', 'client_secret')}</DangerText>
        </div>
      </div>

      <div className="formRow">
        <div className="formGroup col-6">
          <label htmlFor="authorizeUrl">{ getLabel('o_auth', 'authorize_url') }</label>
          <input
            {...register('authorizeUrl', { required: true, pattern: URL_REGEX })}
            id="authorizeUrl"
            className="formControl"
          />
          <DangerText>{errors.authorizeUrl?.type === 'required' && getValidationMessage(errors.authorizeUrl.type, 'o_auth', 'authorize_url')}</DangerText>
          <DangerText>{errors.authorizeUrl?.type === 'pattern' && I18n.t('common.validations.url')}</DangerText>
        </div>

        <div className="formGroup col-6">
          <label htmlFor="tokenUrl">{ getLabel('o_auth', 'token_url') }</label>
          <input
            {...register('tokenUrl', { required: true, pattern: URL_REGEX })}
            id="tokenUrl"
            className="formControl"
          />
          <DangerText>{errors.tokenUrl?.type === 'required' && getValidationMessage(errors.tokenUrl.type, 'o_auth', 'token_url')}</DangerText>
          <DangerText>{errors.tokenUrl?.type === 'pattern' && I18n.t('common.validations.url')}</DangerText>
        </div>
      </div>

      <div className="formGroup">
        <label htmlFor="scope">{ getLabel('o_auth', 'scope') }</label>
        <input
          {...register('scope', { required: true })}
          id="scope"
          className="formControl"
        />
        <DangerText>{errors.scope && getValidationMessage(errors.scope.type, 'o_auth', 'scope')}</DangerText>
      </div>

      <h5>{ I18n.t('site_settings.authentication.form.subtitle_user_profile_config') }</h5>
      <div className="formGroup">
        <label htmlFor="profileUrl">{ getLabel('o_auth', 'profile_url') }</label>
        <input
          {...register('profileUrl', { required: true, pattern: URL_REGEX })}
          id="profileUrl"
          className="formControl"
        />
        <DangerText>{errors.profileUrl?.type === 'required' && getValidationMessage(errors.profileUrl.type, 'o_auth', 'profile_url')}</DangerText>
        <DangerText>{errors.profileUrl?.type === 'pattern' && I18n.t('common.validations.url')}</DangerText>
      </div>

      <div className="formRow">
        <div className="formGroup col-6">
          <label htmlFor="jsonUserEmailPath">{ getLabel('o_auth', 'json_user_email_path') }</label>
          <input
            {...register('jsonUserEmailPath', { required: true })}
            id="jsonUserEmailPath"
            className="formControl"
          />
          <DangerText>
            {errors.jsonUserEmailPath && getValidationMessage(errors.jsonUserEmailPath.type, 'o_auth', 'json_user_email_path')}
          </DangerText>
        </div>

        <div className="formGroup col-6">
          <label htmlFor="jsonUserNamePath">{ getLabel('o_auth', 'json_user_name_path') }</label>
          <input
            {...register('jsonUserNamePath')}
            id="jsonUserNamePath"
            className="formControl"
          />
        </div>
      </div>

      <Button onClick={() => null}>
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

export default OAuthForm;