import * as React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import I18n from 'i18n-js';

import Box from '../common/Box';
import Button from '../common/Button';
import OAuthProviderLink from '../common/OAuthProviderLink';
import { ITenantSignUpUserForm } from './TenantSignUpP';
import { DangerText } from '../common/CustomTexts';
import { getLabel, getValidationMessage } from '../../helpers/formUtils';
import { EMAIL_REGEX } from '../../constants/regex';
import { IOAuth } from '../../interfaces/IOAuth';
import ActionLink from '../common/ActionLink';
import { BackIcon, EditIcon } from '../common/Icons';

interface Props {
  currentStep: number;
  setCurrentStep(step: number): void;
  emailAuth: boolean;
  setEmailAuth(enabled: boolean): void;
  oAuths: Array<IOAuth>;
  oAuthLoginCompleted: boolean;
  oauthUserEmail?: string;
  oauthUserName?: string;
  userData: ITenantSignUpUserForm;
  setUserData({}: ITenantSignUpUserForm): void;
}

const UserSignUpForm = ({
  currentStep,
  setCurrentStep,
  emailAuth,
  setEmailAuth,
  oAuths,
  oAuthLoginCompleted,
  oauthUserEmail,
  oauthUserName,
  userData,
  setUserData,
}: Props) => {
  const {
    register,
    handleSubmit,
    setError,
    getValues,
    formState: { errors }
  } = useForm<ITenantSignUpUserForm>();
  const onSubmit: SubmitHandler<ITenantSignUpUserForm> = data => {
    if (data.password !== data.passwordConfirmation) {
      setError('passwordConfirmation', I18n.t('common.validations.password_mismatch'));
      return;
    }

    setUserData({...data});
    setCurrentStep(currentStep + 1);
  }

  return (
    <Box customClass="tenantSignUpStep1">
      <h3>Create user account</h3>

      {
        currentStep === 1 && !emailAuth && 
        <>
        <Button className="emailAuth" onClick={() => setEmailAuth(true)}>
          Sign up with email
        </Button>

        {
          oAuths.filter(oAuth => oAuth.isEnabled).map((oAuth, i) =>
            <OAuthProviderLink
              oAuthId={oAuth.id}
              oAuthName={oAuth.name}
              oAuthLogo={oAuth.logo}
              oAuthReason='tenantsignup'
              isSignUp
              key={i}
            />
          )
        }
        </>
      }

      {
        currentStep === 1 && emailAuth &&
        <form onSubmit={handleSubmit(onSubmit)}>
          <ActionLink
            onClick={() => setEmailAuth(false)}
            icon={<BackIcon />}
            customClass="backButton"
          >
            {I18n.t('common.buttons.back')}
          </ActionLink>

          <div className="formRow">
            <input
              {...register('fullName', { required: true, minLength: 2 })}
              autoFocus
              placeholder={getLabel('user', 'full_name')}
              id="userFullName"
              className="formControl"
            />
            <DangerText>{errors.fullName &&  getValidationMessage('required', 'user', 'full_name')}</DangerText>
          </div>

          <div className="formRow">
            <input
              {...register('email', { required: true, pattern: EMAIL_REGEX })}
              type="email"
              placeholder={getLabel('user', 'email')}
              id="userEmail"
              className="formControl"
            />
            <DangerText>{errors.email?.type === 'required' && getValidationMessage('required', 'user', 'email')}</DangerText>
            <DangerText>
              {errors.email?.type === 'pattern' && I18n.t('common.validations.email')}
            </DangerText>
          </div>

          <div className="formRow">
            <div className="userPasswordDiv">
              <input
                {...register('password', { required: true, minLength: 6, maxLength: 128 })}
                type="password"
                placeholder={getLabel('user', 'password')}
                id="userPassword"
                className="formControl"
              />
              <DangerText>{ errors.password && I18n.t('common.validations.password', { n: 6 }) }</DangerText>
            </div>

            <div className="userPasswordConfirmationDiv">
              <input
                {...register('passwordConfirmation')}
                type="password"
                placeholder={getLabel('user', 'password_confirmation')}
                id="userPasswordConfirmation"
                className="formControl"
              />
              <DangerText>{ errors.passwordConfirmation && I18n.t('common.validations.password_mismatch') }</DangerText>
            </div>
          </div>

          <Button
            onClick={() => null}
            className="userConfirm"
          >
            { I18n.t('common.buttons.confirm') }
          </Button>
        </form>
      }

      {
        currentStep === 2 && !oAuthLoginCompleted &&
        <p className="userRecap">
          <b>{oAuthLoginCompleted ? oauthUserName : userData.fullName}</b> ({oAuthLoginCompleted ? oauthUserEmail : userData.email})
          <ActionLink onClick={() => setCurrentStep(currentStep-1)} icon={<EditIcon />}>Edit</ActionLink>
        </p>
      }
    </Box>
  );
}

export default UserSignUpForm;