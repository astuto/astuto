import * as React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import I18n from 'i18n-js';

import Box from '../common/Box';
import Button from '../common/Button';
import { ITenantSignUpUserForm } from './TenantSignUpP';

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
  const { register, handleSubmit } = useForm<ITenantSignUpUserForm>();
  const onSubmit: SubmitHandler<ITenantSignUpUserForm> = data => {
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
              type="text"
              autoFocus
              placeholder={I18n.t('common.forms.auth.full_name')}
              id="userFullName"
              className="formControl"
            />
          </div>

          <div className="formRow">
            <input
              {...register('email', { required: true })}
              type="email"
              placeholder={I18n.t('common.forms.auth.email')}
              id="userEmail"
              className="formControl"
            />
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
            </div>

            <div className="formGroup col-6">
              <input
                {...register('passwordConfirmation', { required: true, minLength: 6, maxLength: 128 })}
                type="password"
                placeholder={I18n.t('common.forms.auth.password_confirmation')}
                id="userPasswordConfirmation"
                className="formControl"
              />
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