import * as React from 'react';
import { useState } from 'react';

import TenantSignUpForm from './TenantSignUpForm';
import UserSignUpForm from './UserSignUpForm';
import ConfirmEmailSignUpPage from './ConfirmEmailSignUpPage';
import ConfirmOAuthSignUpPage from './ConfirmOAuthSignUpPage';
import { IOAuth } from '../../interfaces/IOAuth';
import HttpStatus from '../../constants/http_status';
import Box from '../common/Box';

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
  feedbackSpaceCreatedImage: string;
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
  feedbackSpaceCreatedImage,
  pendingTenantImage,
  baseUrl,
  trialPeriodDays,
  authenticityToken
}: Props) => {
  // authMethod is either 'none', 'email' or 'oauth'
  const [authMethod, setAuthMethod] = useState<AuthMethod>(oAuthLoginCompleted ? 'oauth' : 'none');

  // goneBack is set to true if the user goes back from the tenant form to the user form
  const [goneBack, setGoneBack] = useState(false);

  const [userData, setUserData] = useState({
    fullName: (oAuthLoginCompleted && oauthUserName) ? oauthUserName.slice(0, 64) : '',
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
      
      setTenantData({ siteName, subdomain });
      setCurrentStep(currentStep + 1);

      if (authMethod == 'oauth') {
        let redirectUrl = new URL(baseUrl);
        redirectUrl.hostname = `${subdomain}.${redirectUrl.hostname}`;
        redirectUrl.pathname = '/users/sign_in';
        
        // redirect after 3 seconds
        setTimeout(() => {
          window.location.href = redirectUrl.toString();
        }, 3000);

        return;
      }
    });
  }

  // return (
  //   <>
  //   <img src={astutoLogoImage} width={64} height={64} className="astutoLogo" />
    
  //   <div className="tenantSignUpContainer">
  //     {
  //       (currentStep === 1 || currentStep === 2) &&
  //         <UserSignUpForm
  //           currentStep={currentStep}
  //           setCurrentStep={setCurrentStep}
  //           authMethod={authMethod}
  //           setAuthMethod={setAuthMethod}
  //           oAuths={oAuths}
  //           userData={userData}
  //           setUserData={setUserData}
  //           setGoneBack={setGoneBack}
  //         />
  //     }

  //     {
  //       (goneBack || currentStep === 2) &&
  //         <TenantSignUpForm
  //           isSubmitting={isSubmitting}
  //           error={error}
  //           handleSignUpSubmit={handleSignUpSubmit}
  //           trialPeriodDays={trialPeriodDays}
  //           currentStep={currentStep}
  //           setCurrentStep={setCurrentStep}
  //         />
  //     }

  //     {
  //       currentStep === 3 && authMethod === 'oauth' &&
  //         <ConfirmOAuthSignUpPage
  //           baseUrl={baseUrl}
  //           subdomain={tenantData.subdomain}
  //           feedbackSpaceCreatedImage={feedbackSpaceCreatedImage}
  //         />
  //     }

  //     {
  //       currentStep === 3 && authMethod === 'email' &&
  //         <ConfirmEmailSignUpPage
  //           subdomain={tenantData.subdomain}
  //           userEmail={userData.email}
  //           pendingTenantImage={pendingTenantImage}
  //         />
  //     }
  //   </div>
  //   </>
  // );

  return (
    <>
      <img src={astutoLogoImage} width={64} height={64} className="astutoLogo" />
      
      <div className="tenantSignUpContainer">
        <Box>
          <p>It is not possible to sign up to Astuto.</p>
          <p>You can <a href="https://github.com/astuto/astuto">self-host your own instance</a> instead.</p>
        </Box>
      </div>
    </>
  )
}

export default TenantSignUpP;