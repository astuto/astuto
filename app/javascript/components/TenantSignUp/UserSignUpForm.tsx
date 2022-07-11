import * as React from 'react';
import I18n from 'i18n-js';

import Box from '../common/Box';
import Button from '../common/Button';
import { TenantSignUpUserFormState } from '../../reducers/tenantSignUpReducer';

interface Props {
  currentStep: number;
  emailAuth: boolean;
  toggleEmailAuth(): void;
  userForm: TenantSignUpUserFormState;

  handleChangeUserFullName(fullName: string): void;
  handleChangeUserEmail(email: string): void;
  handleChangeUserPassword(password: string): void;
  handleChangeUserPasswordConfirmation(passwordConfirmation: string): void;
  handleUserFormConfirm(): void;
}

class UserSignUpForm extends React.Component<Props> {
  form: any;

  constructor(props: Props) {
    super(props);

    this.form = React.createRef();
  }

  validateUserForm(): boolean {
    let isValid: boolean = this.form.current.reportValidity();
    if (this.validateUserPasswordConfirmation() === false)
      isValid = false;

    return isValid;
  }

  validateUserPasswordConfirmation(): boolean {
    const isValid = this.props.userForm.password === this.props.userForm.passwordConfirmation;
    return isValid;
  }

  render() {
    const {
      currentStep,
      emailAuth,
      toggleEmailAuth,
      userForm,
    
      handleChangeUserFullName,
      handleChangeUserEmail,
      handleChangeUserPassword,
      handleChangeUserPasswordConfirmation,
      handleUserFormConfirm,
    } = this.props;

    return (
      <Box customClass="tenantSignUpStep1">
        <h3>{ I18n.t('signup.step1.title') }</h3>

        {
          currentStep === 1 && !emailAuth && 
          <Button className="emailAuth" onClick={toggleEmailAuth}>
            { I18n.t('signup.step1.email_auth') }
          </Button>
        }

        {
          currentStep === 1 && emailAuth &&
          <form ref={this.form}>
            <div className="formRow">
              <input
                type="text"
                autoFocus
                value={userForm.fullName}
                onChange={e => handleChangeUserFullName(e.target.value)}
                placeholder={I18n.t('common.forms.auth.full_name')}
                required
                id="userFullName"
                className="formControl"
              />
            </div>

            <div className="formRow">
              <input
                type="email"
                value={userForm.email}
                onChange={e => handleChangeUserEmail(e.target.value)}
                placeholder={I18n.t('common.forms.auth.email')}
                required
                id="userEmail"
                className="formControl"
              />
            </div>

            <div className="formRow">
              <div className="formGroup col-6">
                <input
                  type="password"
                  value={userForm.password}
                  onChange={e => handleChangeUserPassword(e.target.value)}
                  placeholder={I18n.t('common.forms.auth.password')}
                  required
                  minLength={6}
                  maxLength={128}
                  id="userPassword"
                  className="formControl"
                />
              </div>

              <div className="formGroup col-6">
                <input
                  type="password"
                  value={userForm.passwordConfirmation}
                  onChange={e => handleChangeUserPasswordConfirmation(e.target.value)}
                  placeholder={I18n.t('common.forms.auth.password_confirmation')}
                  required
                  minLength={6}
                  maxLength={128}
                  id="userPasswordConfirmation"
                  className={`formControl${userForm.passwordConfirmationError ? ' invalid' : ''}`}
                />
              </div>
            </div>

            <Button
              onClick={e => {
                e.preventDefault();
                this.validateUserForm() && handleUserFormConfirm();
              }}
              className="userConfirm"
            >
              { I18n.t('common.buttons.confirm') }
            </Button>
          </form>
        }

        {
          currentStep === 2 &&
          <p><b>{userForm.fullName}</b> ({userForm.email})</p>
        }
      </Box>
    );
  }
}

export default UserSignUpForm;