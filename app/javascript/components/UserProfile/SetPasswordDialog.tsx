import * as React from 'react';
import I18n from 'i18n-js';

import Button from '../common/Button';
import buildRequestHeaders from '../../helpers/buildRequestHeaders';

interface Props {
  sendSetPasswordInstructionsEndpoint: string;
  authenticityToken: string;
}

const SetPasswordDialog = ({ sendSetPasswordInstructionsEndpoint, authenticityToken }: Props) => {
  

  return (
    <div style={{margin: 8, padding: 16, backgroundColor: '#cce5ff', borderRadius: 4}}>
      <p>
        { I18n.t('common.forms.auth.no_password_set') }
      </p>

      <Button
        type='button'
        onClick={async (event) => {
          const res = await fetch(sendSetPasswordInstructionsEndpoint, {
            method: 'GET',
            headers: buildRequestHeaders(authenticityToken)
          });

          if (res.ok) {
            alert(I18n.t('devise.passwords.send_instructions'));
          } else {
            alert(I18n.t('common.errors.unknown'));
          }
        }}>
        { I18n.t('common.forms.auth.set_password') }
      </Button>
    </div>
  )
};

export default SetPasswordDialog;
