import * as React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import I18n from 'i18n-js';

import Box from '../common/Box';
import Button from '../common/Button';
import { ITenantSignUpUserForm } from './TenantSignUpP';
import { DangerText } from '../common/CustomTexts';

interface Props {
  currentStep: number;
  setCurrentStep(step: number): void;
  emailAuth: boolean;
  setEmailAuth(enabled: boolean): void;
  userData: ITenantSignUpUserForm;
  setUserData({}: ITenantSignUpUserForm): void;
}

const UserSignUpForm = ({
  currentStep,
  setCurrentStep,
  emailAuth,
  setEmailAuth,
  userData,
  setUserData,
}: Props) => {
  const { register, handleSubmit, setError, formState: { errors } } = useForm<ITenantSignUpUserForm>();
  const onSubmit: SubmitHandler<ITenantSignUpUserForm> = data => {
    if (data.password !== data.passwordConfirmation) {
      setError('passwordConfirmation', I18n.t('signup.step1.validations.password_mismatch'));
      return;
    }

    setUserData({...data});
    setCurrentStep(currentStep + 1);
  }

  return (
    <Box customClass="tenantSignUpStep1">
      <h3>{ I18n.t('signup.step1.title') }</h3>

      {
        currentStep === 1 && !emailAuth && 
        <Button className="emailAuth" onClick={() => setEmailAuth(true)}>
          { I18n.t('signup.step1.email_auth') }
        </Button>
      }

      {
        currentStep === 1 && emailAuth &&
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="formRow">
            <input
              {...register('fullName', { required: true })}
              autoFocus
              placeholder={I18n.t('common.forms.auth.full_name')}
              id="userFullName"
              className="formControl"
            />
            <DangerText>{ errors.fullName && I18n.t('signup.step1.validations.full_name') }</DangerText>
          </div>

          <div className="formRow">
            <input
              {...register('email', { required: true, pattern: /(.+)@(.+){2,}\.(.+){2,}/ })}
              type="email"
              placeholder={I18n.t('common.forms.auth.email')}
              id="userEmail"
              className="formControl"
            />
            <DangerText>{ errors.email && I18n.t('signup.step1.validations.email') }</DangerText>
          </div>

          <div className="formRow">
            <div className="formGroup col-6">
              <input
                {...register('password', { required: true, minLength: 6, maxLength: 128 })}
                type="password"
                placeholder={I18n.t('common.forms.auth.password')}
                id="userPassword"
                className="formControl"
              />
              <DangerText>{ errors.password && I18n.t('signup.step1.validations.password', { n: 6 }) }</DangerText>
            </div>

            <div className="formGroup col-6">
              <input
                {...register('passwordConfirmation')}
                type="password"
                placeholder={I18n.t('common.forms.auth.password_confirmation')}
                id="userPasswordConfirmation"
                className="formControl"
              />
              <DangerText>{ errors.passwordConfirmation && I18n.t('signup.step1.validations.password_mismatch') }</DangerText>
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
        currentStep === 2 &&
        <p><b>{userData.fullName}</b> ({userData.email})</p>
      }
    </Box>
  );
}

export default UserSignUpForm;