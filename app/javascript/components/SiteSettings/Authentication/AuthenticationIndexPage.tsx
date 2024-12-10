import * as React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import I18n from 'i18n-js';

import Box from '../../common/Box';
import OAuthProvidersList from './OAuthProvidersList';
import { AuthenticationPages } from './AuthenticationSiteSettingsP';
import { OAuthsState } from '../../../reducers/oAuthsReducer';
import SiteSettingsInfoBox from '../../common/SiteSettingsInfoBox';
import { TENANT_SETTING_EMAIL_REGISTRATION_POLICY_ALL_ALLOWED, TENANT_SETTING_EMAIL_REGISTRATION_POLICY_CUSTOM_DOMAINS_ALLOWED, TENANT_SETTING_EMAIL_REGISTRATION_POLICY_NONE_ALLOWED, TenantSettingEmailRegistrationPolicy } from '../../../interfaces/ITenantSetting';
import { getLabel } from '../../../helpers/formUtils';
import HttpStatus from '../../../constants/http_status';
import { SmallMutedText } from '../../common/CustomTexts';
import Button from '../../common/Button';

export interface IAuthenticationForm {
  emailRegistrationPolicy: string;
  allowedEmailDomains: string;
}

interface Props {
  originForm: IAuthenticationForm;

  oAuths: OAuthsState;
  isSubmitting: boolean;
  submitError: string;

  handleToggleEnabledOAuth(id: number, enabled: boolean): void;
  handleToggleEnabledDefaultOAuth(id: number, enabled: boolean): void;
  handleDeleteOAuth(id: number): void;
  handleUpdateTenantSettings(emailRegistrationPolicy: TenantSettingEmailRegistrationPolicy, allowedEmailDomains: string): Promise<any>;

  setPage: React.Dispatch<React.SetStateAction<AuthenticationPages>>;
  setSelectedOAuth: React.Dispatch<React.SetStateAction<number>>;
}

const AuthenticationIndexPage = ({
  originForm,
  oAuths,
  isSubmitting,
  submitError,

  handleToggleEnabledOAuth,
  handleToggleEnabledDefaultOAuth,
  handleDeleteOAuth,
  handleUpdateTenantSettings,

  setPage,
  setSelectedOAuth,
}: Props) => {
  const {
    register,
    handleSubmit,
    formState: { isDirty, isSubmitSuccessful, errors },
    setValue,
  } = useForm<IAuthenticationForm>({
    defaultValues: {
      emailRegistrationPolicy: originForm.emailRegistrationPolicy,
      allowedEmailDomains: originForm.allowedEmailDomains,
    },
  });

  const onSubmit: SubmitHandler<IAuthenticationForm> = data => {
    handleUpdateTenantSettings(
      data.emailRegistrationPolicy as TenantSettingEmailRegistrationPolicy,
      data.allowedEmailDomains,
    ).then(res => {
      if (res?.status !== HttpStatus.OK) return;

      window.location.reload();
    });
  };

  const [isDirtyAllowedEmails, setIsDirtyAllowedEmails] = React.useState(false);

  return (
    <>
      <Box customClass="authenticationIndexPage">
        <h2>{ I18n.t('site_settings.authentication.title') }</h2>

        <div className="emailRegistrationPolicy">
          <h4>{ I18n.t('site_settings.authentication.email_registration_subtitle') }</h4>

          <form onSubmit={handleSubmit(onSubmit)} onChange={handleSubmit(onSubmit)}>
            <div className="formGroup">
              <label htmlFor="brandSetting">{ getLabel('tenant_setting', 'email_registration_policy') }</label>
              <select
                {...register('emailRegistrationPolicy')}
                id="emailRegistrationPolicy"
                className="selectPicker"
              >
                <option value={TENANT_SETTING_EMAIL_REGISTRATION_POLICY_ALL_ALLOWED}>
                  { I18n.t('site_settings.authentication.email_registration_policy_all') }
                </option>
                <option value={TENANT_SETTING_EMAIL_REGISTRATION_POLICY_NONE_ALLOWED}>
                  { I18n.t('site_settings.authentication.email_registration_policy_none') }
                </option>
                <option value={TENANT_SETTING_EMAIL_REGISTRATION_POLICY_CUSTOM_DOMAINS_ALLOWED}>
                  { I18n.t('site_settings.authentication.email_registration_policy_custom') }
                </option>
              </select>
            </div>

            {
              originForm.emailRegistrationPolicy === TENANT_SETTING_EMAIL_REGISTRATION_POLICY_CUSTOM_DOMAINS_ALLOWED &&
              <>
                <div className="formGroup">
                  <label htmlFor="allowedEmailDomains">{ getLabel('tenant_setting', 'allowed_email_domains') }</label>
                  
                  <div style={{display: 'flex'}}>
                    <input
                      {...register('allowedEmailDomains')}
                      onChange={(e) => {
                        e.stopPropagation();
                        setIsDirtyAllowedEmails(e.target.value !== originForm.allowedEmailDomains);
                      }}
                      style={{marginRight: 8}}
                      id="allowedEmailDomains"
                      type="text"
                      className="formControl"
                    />
                    <Button onClick={() => null} disabled={!isDirtyAllowedEmails}>
                      {I18n.t('common.buttons.update')}
                    </Button>
                  </div>

                  <SmallMutedText>
                    { I18n.t('site_settings.authentication.allowed_email_domains_help') }
                  </SmallMutedText>
                </div>
              </>
            }
          </form>
        </div>

        <br />

        <OAuthProvidersList
          oAuths={oAuths.items}
          handleToggleEnabledOAuth={handleToggleEnabledOAuth}
          handleToggleEnabledDefaultOAuth={handleToggleEnabledDefaultOAuth}
          handleDeleteOAuth={handleDeleteOAuth}
          setPage={setPage}
          setSelectedOAuth={setSelectedOAuth}
        />
      </Box>

      <SiteSettingsInfoBox
        areUpdating={oAuths.areLoading || isSubmitting}
        error={oAuths.error || submitError}
        areDirty={isDirtyAllowedEmails}
      />
    </>
  );
}

export default AuthenticationIndexPage;