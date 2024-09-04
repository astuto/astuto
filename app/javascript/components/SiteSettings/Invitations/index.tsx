import * as React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import I18n from 'i18n-js';

import Box from '../../common/Box';
import Button from '../../common/Button';
import { SmallMutedText } from '../../common/CustomTexts';
import buildRequestHeaders from '../../../helpers/buildRequestHeaders';
import HttpStatus from '../../../constants/http_status';
import { isValidEmail } from '../../../helpers/regex';

interface Props {
  siteName: string;
  authenticityToken: string;
}

interface IFormData {
  to: string;
  subject: string;
  body: string;
}

const MAX_INVITATIONS = 20;

const Invitations = ({ siteName, authenticityToken }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { },
    watch,
  } = useForm<IFormData>({
    defaultValues: {
      to: '',
      subject: I18n.t('site_settings.invitations.subject_default', { name: siteName }),
      body: I18n.t('site_settings.invitations.body_default', { name: siteName }),
    },
  });

  const to = watch('to');
  const emailList = to.split(',');

  return (
    <Box>
      <h2>{ I18n.t('site_settings.invitations.title') }</h2>
      <h3>{ I18n.t('site_settings.invitations.send_subtitle') }</h3>

      <form
        onSubmit={handleSubmit(async (formData) => {
          const emailToList = formData.to.split(',').map((email) => email.trim());
          const invalidEmails = emailToList.filter((email) => !isValidEmail(email));

          if (emailList.length > MAX_INVITATIONS) {
            alert(I18n.t('site_settings.invitations.too_many_emails', { count: MAX_INVITATIONS }));
            return;
          }

          if (invalidEmails.length > 0) {
            alert(I18n.t('site_settings.invitations.invalid_emails', { emails: invalidEmails.join(', ') }));
            return;
          }

          if (!formData.body.includes('%link%')) {
            alert(I18n.t('site_settings.invitations.invitation_link_not_found'));
            return;
          }

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
            {...register('to', { required: true })}
            placeholder="alice@example.com,bob@test.org"
            type="text"
            className="formControl"
            id="to"
          />
          <SmallMutedText>
            {`${ I18n.t('site_settings.invitations.to_help') } ${ I18n.t('site_settings.invitations.too_many_emails', { count: MAX_INVITATIONS }) }`}
          </SmallMutedText>
        </div>

        <div className="formGroup">
          <label htmlFor="subject">{ I18n.t('site_settings.invitations.subject') }</label>
          <input
            {...register('subject', { required: true })}
            type="text"
            className="formControl"
            id="subject"
          />
        </div>

        <div className="formGroup">
          <label htmlFor="body">{ I18n.t('site_settings.invitations.body') }</label>
          <textarea
            {...register('body', { required: true })}
            className="formControl"
            id="body"
          />
        </div>

        <Button onClick={() => {}} disabled={to === ''}>
          { I18n.t('site_settings.invitations.send', { count: emailList.length }) }
        </Button>
      </form>

      <br />

      <h3>{ I18n.t('site_settings.invitations.sent_subtitle') }</h3>
    </Box>
  );
};

export default Invitations;