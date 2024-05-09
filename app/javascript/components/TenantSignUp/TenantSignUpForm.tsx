import * as React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import Box from '../common/Box';
import Button from '../common/Button';
import Spinner from '../common/Spinner';
import { DangerText, SmallMutedText } from '../common/CustomTexts';
import { ITenantSignUpTenantForm } from './TenantSignUpP';
import HttpStatus from '../../constants/http_status';
import { getLabel, getValidationMessage } from '../../helpers/formUtils';

interface Props {
  isSubmitting: boolean;
  error: string;
  handleSignUpSubmit(siteName: string, subdomain: string): void;
  trialPeriodDays: number;
}

const TenantSignUpForm = ({
  isSubmitting,
  error,
  handleSignUpSubmit,
  trialPeriodDays,
}: Props) => {
  const { register, handleSubmit, formState: { errors } } = useForm<ITenantSignUpTenantForm>();
  const onSubmit: SubmitHandler<ITenantSignUpTenantForm> = data => {
    handleSignUpSubmit(data.siteName, data.subdomain);
  }

  return (
    <Box customClass="tenantSignUpStep2">
      <h3>Create feedback space</h3>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="formRow">
          <input
            {...register('siteName', { required: true })}
            autoFocus
            placeholder={getLabel('tenant', 'site_name')}
            id="tenantSiteName"
            className="formControl"
          />
          <DangerText>{errors.siteName?.type === 'required' && getValidationMessage('required', 'tenant', 'site_name')}</DangerText>
        </div>

        <div className="formRow">
          <div className="input-group">
            <div className="input-group-prepend">
              <div className="input-group-text">https://</div>
            </div>
            <input
              {...register('subdomain', {
                required: true,
                pattern: /^[a-zA-Z0-9-]+$/,
                validate: {
                  noSpaces: (value) => !/\s/.test(value),
                  notAlreadyTaken: async (newSubdomain) => {
                    const res = await fetch(`/is_available?new_subdomain=${newSubdomain}`);
                    return res.status === HttpStatus.OK;
                  },
                },
              })}
              placeholder={getLabel('tenant', 'subdomain').toLowerCase()}
              id="tenantSubdomain"
              className="formControl"
            />
            <div className="input-group-append">
              <div className="input-group-text">.astuto.io</div>
            </div>
          </div>
          <DangerText>
            {errors.subdomain?.type === 'required' && getValidationMessage('required', 'tenant', 'subdomain')}
          </DangerText>
          <DangerText>
            {errors.subdomain?.type === 'pattern' && 'Subdomain can only contain alphanumeric characters and hyphens'}
          </DangerText>
          <DangerText>
            {errors.subdomain?.type === 'notAlreadyTaken' && 'Sorry, this subdomain is not available'}
          </DangerText>
        </div>

        <Button
          onClick={() => null}
          className="tenantConfirm"
        >
          { isSubmitting ? <Spinner /> : 'Create feedback space' }
        </Button>
        <p className="smallMutedText" style={{textAlign: 'center'}}>
          Your trial starts now and ends in {trialPeriodDays.toString()} days.
        </p>
        <p className="smallMutedText" style={{textAlign: 'center'}}>
          By clicking "Create", you agree to our <a href="https://astuto.io/terms-of-service" target="_blank" className="link">Terms of Service</a> and <a href="https://astuto.io/privacy-policy" target="_blank" className="link">Privacy Policy</a>.
        </p>

        { error !== '' && <DangerText>{ error }</DangerText> }
      </form>
    </Box>
  );
}

export default TenantSignUpForm;