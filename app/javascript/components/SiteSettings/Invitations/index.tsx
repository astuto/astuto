import * as React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import I18n from 'i18n-js';

import Box from '../../common/Box';
import Button from '../../common/Button';
import { SmallMutedText } from '../../common/CustomTexts';
import buildRequestHeaders from '../../../helpers/buildRequestHeaders';
import HttpStatus from '../../../constants/http_status';

interface Props {
  siteName: string;
  authenticityToken: string;
}

const Invitations = ({ siteName, authenticityToken }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { isDirty, isSubmitSuccessful },
  } = useForm({
    defaultValues: {
      to: '',
      subject: I18n.t('site_settings.invitations.subject_default', { name: siteName }),
      body: I18n.t('site_settings.invitations.body_default', { name: siteName }),
    },
  });

  return (
    <Box>
      <h2>{ I18n.t('site_settings.invitations.title') }</h2>
      <p>{ I18n.t('site_settings.invitations.description') }</p>

      <form
        onSubmit={handleSubmit(async (formData) => {
          const res = await fetch(`/invitations`, {
            method: 'POST',
            headers: buildRequestHeaders(authenticityToken),
            body: JSON.stringify({
              invitations: {
                to: formData.to,
                subject: formData.subject,
                body: formData.body,
              }
            }),
          });

          const json = await res.json();

          if (res.status === HttpStatus.OK) {
            console.log('success');
          } else {
            console.log('error');
          }
        }
      )}>
        <div className="formGroup">
          <label htmlFor="to">{ I18n.t('site_settings.invitations.to') }</label>
          <input
            {...register('to')}
            placeholder="alice@example.com,bob@test.org"
            type="text"
            className="formControl"
            id="to"
          />
          <SmallMutedText>
            { I18n.t('site_settings.invitations.to_help') }
          </SmallMutedText>
        </div>

        <div className="formGroup">
          <label htmlFor="subject">{ I18n.t('site_settings.invitations.subject') }</label>
          <input
            {...register('subject')}
            type="text"
            className="formControl"
            id="subject"
          />
        </div>

        <div className="formGroup">
          <label htmlFor="body">{ I18n.t('site_settings.invitations.body') }</label>
          <textarea
            {...register('body')}
            className="formControl"
            id="body"
          />
        </div>

        <Button onClick={() => {}}>
          { I18n.t('common.buttons.send') }
        </Button>
      </form>
    </Box>
  );
};

export default Invitations;