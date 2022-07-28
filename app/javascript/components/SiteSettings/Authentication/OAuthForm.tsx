import * as React from 'react';
import I18n from 'i18n-js';
import { SubmitHandler, useForm } from 'react-hook-form';
import { DangerText } from '../../common/CustomTexts';
import getValidationMessage from '../../../helpers/getValidationMessage';
import Button from '../../common/Button';
import { URL_REGEX } from '../../../constants/regex';

interface Props {

}

interface ISiteSettingsOAuthForm {
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

}: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<ISiteSettingsOAuthForm>({
    defaultValues: {
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
    },
  });

  const onSubmit: SubmitHandler<ISiteSettingsOAuthForm> = data => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="formRow">
        <div className="formGroup col-6">
          <label htmlFor="name">{ I18n.t('site_settings.authentication.form.name') }</label>
          <input
            {...register('name', { required: true })}
            id="name"
            className="formControl"
          />
          <DangerText>{errors.name && getValidationMessage(errors.name.type, 'o_auth', 'name')}</DangerText>
        </div>

        <div className="formGroup col-6">
          <label htmlFor="logo">{ I18n.t('site_settings.authentication.form.logo') }</label>
          <input
            {...register('logo')}
            id="logo"
            className="formControl"
          />
        </div>
      </div>

      <h5>OAuth configuration</h5>
      <div className="formRow">
        <div className="formGroup col-6">
          <label htmlFor="clientId">{ I18n.t('site_settings.authentication.form.clientId') }</label>
          <input
            {...register('clientId', { required: true })}
            id="clientId"
            className="formControl"
          />
          <DangerText>{errors.clientId && getValidationMessage(errors.clientId.type, 'o_auth', 'client_id')}</DangerText>
        </div>

        <div className="formGroup col-6">
          <label htmlFor="clientSecret">{ I18n.t('site_settings.authentication.form.clientSecret') }</label>
          <input
            {...register('clientSecret', { required: true })}
            id="clientSecret"
            className="formControl"
          />
          <DangerText>{errors.clientSecret && getValidationMessage(errors.clientSecret.type, 'o_auth', 'client_secret')}</DangerText>
        </div>
      </div>

      <div className="formRow">
        <div className="formGroup col-6">
          <label htmlFor="authorizeUrl">{ I18n.t('site_settings.authentication.form.authorizeUrl') }</label>
          <input
            {...register('authorizeUrl', { required: true, pattern: URL_REGEX })}
            id="authorizeUrl"
            className="formControl"
          />
          <DangerText>{errors.authorizeUrl?.type === 'required' && getValidationMessage(errors.authorizeUrl.type, 'o_auth', 'authorize_url')}</DangerText>
          <DangerText>{errors.authorizeUrl?.type === 'pattern' && I18n.t('common.validations.url')}</DangerText>
        </div>

        <div className="formGroup col-6">
          <label htmlFor="tokenUrl">{ I18n.t('site_settings.authentication.form.tokenUrl') }</label>
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
        <label htmlFor="scope">{ I18n.t('site_settings.authentication.form.scope') }</label>
        <input
          {...register('scope', { required: true })}
          id="scope"
          className="formControl"
        />
        <DangerText>{errors.scope && getValidationMessage(errors.scope.type, 'o_auth', 'scope')}</DangerText>
      </div>

      <h5>User profile configuration</h5>
      <div className="formGroup">
        <label htmlFor="profileUrl">{ I18n.t('site_settings.authentication.form.profileUrl') }</label>
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
          <label htmlFor="jsonUserEmailPath">{ I18n.t('site_settings.authentication.form.jsonUserEmailPath') }</label>
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
          <label htmlFor="jsonUserNamePath">{ I18n.t('site_settings.authentication.form.jsonUserNamePath') }</label>
          <input
            {...register('jsonUserNamePath')}
            id="jsonUserNamePath"
            className="formControl"
          />
        </div>
      </div>

      <Button onClick={() => null}>{I18n.t('common.buttons.create')}</Button>
    </form>
  );
}

export default OAuthForm;