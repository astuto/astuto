import * as React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import I18n from 'i18n-js';

import Box from '../../common/Box';
import Button from '../../common/Button';

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
      subject: I18n.t('site_settings.invitations.subject_default', { name: siteName }),
      body: I18n.t('site_settings.invitations.body_default', { name: siteName }),
    },
  });

  return (
    <Box>
      <h2>{ I18n.t('site_settings.invitations.title') }</h2>
      <p>{ I18n.t('site_settings.invitations.description') }</p>

      <form
        onSubmit={handleSubmit(() => {
          console.log('submit');
        }
      )}>
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