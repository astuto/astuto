import * as React from 'react';
import { useState } from 'react';
import HttpStatus from '../../constants/http_status';
import ConfirmSignUpPage from './ConfirmSignUpPage';

import TenantSignUpForm from './TenantSignUpForm';
import UserSignUpForm from './UserSignUpForm';
import { IOAuth } from '../../interfaces/IOAuth';

interface Props {
  oAuthLoginCompleted: boolean;
  oauthUserEmail?: string;
  oauthUserName?: string;
  oAuths: Array<IOAuth>;

  isSubmitting: boolean;
  error: string;

  handleSubmit(
    userFullName: string,
    userEmail: string,
    userPassword: string,
    siteName: string,
    subdomain: string,
    isOAuthLogin: boolean,
    authenticityToken: string,
  ): Promise<any>;

  baseUrl: string;
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
  oAuths,
  oAuthLoginCompleted,
  oauthUserEmail,
  oauthUserName,
  isSubmitting,
  error,
  handleSubmit,
  baseUrl,
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

  const [currentStep, setCurrentStep] = useState(oAuthLoginCompleted ? 2 : 1);

  const [emailAuth, setEmailAuth] = useState(false);

  const handleSignUpSubmit = (siteName: string, subdomain: string) => {
    handleSubmit(
      oAuthLoginCompleted ? oauthUserName : userData.fullName,
      oAuthLoginCompleted ? oauthUserEmail : userData.email,
      userData.password,
      siteName,
      subdomain,
      oAuthLoginCompleted,
      authenticityToken,
    ).then(res => {
      if (res?.status !== HttpStatus.Created) return;
      if (oAuthLoginCompleted) {
        let redirectUrl = new URL(baseUrl);
        redirectUrl.hostname = `${subdomain}.${redirectUrl.hostname}`;
        window.location.href = redirectUrl.toString();
        return;
      }

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
            oAuths={oAuths}
            oAuthLoginCompleted={oAuthLoginCompleted}
            oauthUserEmail={oauthUserEmail}
            oauthUserName={oauthUserName}
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