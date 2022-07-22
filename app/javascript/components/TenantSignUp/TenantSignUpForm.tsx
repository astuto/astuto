import * as React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import I18n from 'i18n-js';

import Box from '../common/Box';
import Button from '../common/Button';
import Spinner from '../common/Spinner';
import { DangerText } from '../common/CustomTexts';
import { ITenantSignUpTenantForm } from './TenantSignUpP';
import HttpStatus from '../../constants/http_status';

interface Props {
  isSubmitting: boolean;
  error: string;
  handleSignUpSubmit(siteName: string, subdomain: string): void;
}

const TenantSignUpForm = ({
  isSubmitting,
  error,
  handleSignUpSubmit,
}: Props) => {
  const { register, handleSubmit, formState: { errors } } = useForm<ITenantSignUpTenantForm>();
  const onSubmit: SubmitHandler<ITenantSignUpTenantForm> = data => {
    handleSignUpSubmit(data.siteName, data.subdomain);
  }

  return (
    <Box customClass="tenantSignUpStep2">
      <h3>{ I18n.t('signup.step2.title') }</h3>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="formRow">
          <input
            {...register('siteName', { required: true })}
            autoFocus
            placeholder={I18n.t('signup.step2.site_name')}
            id="tenantSiteName"
            className="formControl"
          />
          <DangerText>{errors.siteName && I18n.t('signup.step2.validations.site_name')}</DangerText>
        </div>

        <div className="formRow">
          <div className="input-group">
            <input
              {...register('subdomain', {
                required: true,
                validate: async (newSubdomain) => {
                  const res = await fetch(`/is_available?new_subdomain=${newSubdomain}`);
                  return res.status === HttpStatus.OK;
                },
              })}
              placeholder={I18n.t('signup.step2.subdomain')}
              id="tenantSubdomain"
              className="formControl"
            />
            <div className="input-group-append">
              <div className="input-group-text">.astuto.io</div>
            </div>
          </div>
          <DangerText>
            {errors.subdomain?.type === 'required' && I18n.t('signup.step2.validations.subdomain')}
          </DangerText>
          <DangerText>
            {errors.subdomain?.type === 'validate' && I18n.t('signup.step2.validations.subdomain_already_taken')}
          </DangerText>
        </div>

        <Button
          onClick={() => null}
          className="tenantConfirm"
        >
          { isSubmitting ? <Spinner /> : I18n.t('signup.step2.create_button') }
        </Button>

        { error !== '' && <DangerText>{ error }</DangerText> }
      </form>
    </Box>
  );
}

export default TenantSignUpForm;