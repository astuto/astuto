import * as React from 'react';
import { TenantSignUpTenantFormState, TenantSignUpUserFormState } from '../../reducers/tenantSignUpReducer';
import ConfirmSignUpPage from './ConfirmSignUpPage';

import TenantSignUpForm from './TenantSignUpForm';
import UserSignUpForm from './UserSignUpForm';

interface Props {
  authenticityToken: string;

  currentStep: number;
  emailAuth: boolean;
  isSubmitting: boolean;
  error: string;

  toggleEmailAuth(): void;

  userForm: TenantSignUpUserFormState;
  handleChangeUserFullName(fullName: string): void;
  handleChangeUserEmail(email: string): void;
  handleChangeUserPassword(password: string): void;
  handleChangeUserPasswordConfirmation(passwordConfirmation: string): void;
  handleUserFormConfirm(): void;

  tenantForm: TenantSignUpTenantFormState;
  handleChangeTenantSiteName(siteName: string): void;
  handleChangeTenantSubdomain(subdomain: string): void;

  handleSubmit(
    userFullName: string,
    userEmail: string,
    userPassword: string,
    siteName: string,
    subdomain: string,
    authenticityToken: string,
  ): void;
}

class TenantSignUpP extends React.Component<Props> {
  constructor(props: Props) {
    super(props);

    this._handleSubmit = this._handleSubmit.bind(this);
  }

  _handleSubmit() {
    const { userForm, tenantForm, handleSubmit } = this.props;

    handleSubmit(
      userForm.fullName,
      userForm.email,
      userForm.password,
      tenantForm.siteName,
      tenantForm.subdomain,
      this.props.authenticityToken,
    );
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

      tenantForm,
      handleChangeTenantSiteName,
      handleChangeTenantSubdomain,

      isSubmitting,
      error,
    } = this.props;

    return (
      <div className="tenantSignUpContainer">
        {
          (currentStep === 1 || currentStep === 2) &&
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
        }

        {
          currentStep === 2 &&
            <TenantSignUpForm
              tenantForm={tenantForm}
              handleChangeTenantSiteName={handleChangeTenantSiteName}
              handleChangeTenantSubdomain={handleChangeTenantSubdomain}

              isSubmitting={isSubmitting}
              error={error}
              handleSubmit={this._handleSubmit}
            />
        }

        {
          currentStep === 3 &&
            <ConfirmSignUpPage
              subdomain={tenantForm.subdomain}
              userEmail={userForm.email}
            />
        }
      </div>
    );
  }
}

export default TenantSignUpP;