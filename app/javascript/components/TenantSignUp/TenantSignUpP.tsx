import * as React from 'react';
import { TenantSignUpTenantFormState, TenantSignUpUserFormState } from '../../reducers/tenantSignUpReducer';

import TenantSignUpForm from './TenantSignUpForm';
import UserSignUpForm from './UserSignUpForm';

interface Props {
  authenticityToken: string;

  currentStep: number;
  emailAuth: boolean;
  toggleEmailAuth(): void;

  userForm: TenantSignUpUserFormState;
  handleChangeUserFullName(fullName: string): void;
  handleChangeUserEmail(email: string): void;
  handleChangeUserPassword(password: string): void;
  handleChangeUserPasswordConfirmation(passwordConfirmation: string): void;
  handleUserFormConfirm(): void;

  tenantForm: TenantSignUpTenantFormState;
}

class TenantSignUpP extends React.Component<Props> {
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

      tenantForm,
    } = this.props;

    return (
      <div className="tenantSignUpContainer">
        <UserSignUpForm
          currentStep={currentStep}

          emailAuth={emailAuth}
          toggleEmailAuth={toggleEmailAuth}
          userForm={userForm}

          handleChangeUserFullName={handleChangeUserFullName}
          handleChangeUserEmail={handleChangeUserEmail}
          handleChangeUserPassword={handleChangeUserPassword}
          handleChangeUserPasswordConfirmation={handleChangeUserPasswordConfirmation}
          handleUserFormConfirm={handleUserFormConfirm}
        />

        {
          currentStep === 2 ?
            <TenantSignUpForm />
          :
            null
        }
      </div>
    );
  }
}

export default TenantSignUpP;