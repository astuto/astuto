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

  astutoLogoImage: string;
  pendingTenantImage: string;

  baseUrl: string;
  trialPeriodDays: number;

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

export type AuthMethod = 'none' | 'email' | 'oauth';

const TenantSignUpP = ({
  oAuths,
  oAuthLoginCompleted,
  oauthUserEmail,
  oauthUserName,
  isSubmitting,
  error,
  handleSubmit,
  astutoLogoImage,
  pendingTenantImage,
  baseUrl,
  trialPeriodDays,
  authenticityToken
}: Props) => {
  // authMethod is either 'none', 'email' or 'oauth'
  const [authMethod, setAuthMethod] = useState<AuthMethod>(oAuthLoginCompleted ? 'oauth' : 'none');

  const [userData, setUserData] = useState({
    fullName: oAuthLoginCompleted ? oauthUserName : '',
    email: oAuthLoginCompleted ? oauthUserEmail : '',
    password: '',
    passwordConfirmation: '',
  });

  const [tenantData, setTenantData] = useState({
    siteName: '',
    subdomain: '',
  });

  const [currentStep, setCurrentStep] = useState(oAuthLoginCompleted ? 2 : 1);

  const handleSignUpSubmit = (siteName: string, subdomain: string) => {
    handleSubmit(
      userData.fullName,
      userData.email,
      userData.password,
      siteName,
      subdomain,
      authMethod == 'oauth',
      authenticityToken,
    ).then(res => {
      if (res?.status !== HttpStatus.Created) return;
      if (authMethod == 'oauth') {
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
    <>
    <img src={astutoLogoImage} width={64} height={64} className="astutoLogo" />
    
    <div className="tenantSignUpContainer">
      {
        (currentStep === 1 || currentStep === 2) &&
          <UserSignUpForm
            currentStep={currentStep}
            setCurrentStep={setCurrentStep}
            authMethod={authMethod}
            setAuthMethod={setAuthMethod}
            oAuths={oAuths}
            userData={userData}
            setUserData={setUserData}
          />
      }

      {
        (currentStep === 1 || currentStep === 2) &&
          <TenantSignUpForm
            isSubmitting={isSubmitting}
            error={error}
            handleSignUpSubmit={handleSignUpSubmit}
            trialPeriodDays={trialPeriodDays}
            currentStep={currentStep}
          />
      }

      {
        currentStep === 3 &&
          <ConfirmSignUpPage
            subdomain={tenantData.subdomain}
            userEmail={userData.email}
            pendingTenantImage={pendingTenantImage}
          />
      }
    </div>
    </>
  );
}

export default TenantSignUpP;