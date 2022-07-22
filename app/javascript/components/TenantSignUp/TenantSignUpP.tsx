import * as React from 'react';
import { useState } from 'react';
import HttpStatus from '../../constants/http_status';
import ConfirmSignUpPage from './ConfirmSignUpPage';

import TenantSignUpForm from './TenantSignUpForm';
import UserSignUpForm from './UserSignUpForm';

interface Props {
  isSubmitting: boolean;
  error: string;

  handleSubmit(
    userFullName: string,
    userEmail: string,
    userPassword: string,
    siteName: string,
    subdomain: string,
    authenticityToken: string,
  ): Promise<any>;

  authenticityToken: string;
}

export interface ITenantSignUpUserForm {
  fullName: string;
  email: string;
  password: string;
  passwordConfirmation: string;
}

export interface ITenantSignUpTenantForm {
  siteName: string;
  subdomain: string;
}

const TenantSignUpP = ({
  isSubmitting,
  error,
  handleSubmit,
  authenticityToken
}: Props) => {
  const [userData, setUserData] = useState({
    fullName: '',
    email: '',
    password: '',
    passwordConfirmation: '',
  });

  const [tenantData, setTenantData] = useState({
    siteName: '',
    subdomain: '',
  });

  const [currentStep, setCurrentStep] = useState(1);
  const [emailAuth, setEmailAuth] = useState(false);

  const handleSignUpSubmit = (siteName: string, subdomain: string) => {
    handleSubmit(
      userData.fullName,
      userData.email,
      userData.password,
      siteName,
      subdomain,
      authenticityToken,
    ).then(res => {
      if (res?.status !== HttpStatus.Created) return;

      setTenantData({ siteName, subdomain });
      setCurrentStep(currentStep + 1);
    });
  }

  return (
    <div className="tenantSignUpContainer">
      {
        (currentStep === 1 || currentStep === 2) &&
          <UserSignUpForm
            currentStep={currentStep}
            setCurrentStep={setCurrentStep}
            emailAuth={emailAuth}
            setEmailAuth={setEmailAuth}
            userData={userData}
            setUserData={setUserData}
          />
      }

      {
        currentStep === 2 &&
          <TenantSignUpForm
            isSubmitting={isSubmitting}
            error={error}
            handleSignUpSubmit={handleSignUpSubmit}
          />
      }

      {
        currentStep === 3 &&
          <ConfirmSignUpPage
            subdomain={tenantData.subdomain}
            userEmail={userData.email}
          />
      }
    </div>
  );
}

export default TenantSignUpP;