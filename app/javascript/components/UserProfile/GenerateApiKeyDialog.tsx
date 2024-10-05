import * as React from 'react';
import I18n from 'i18n-js';

import { DangerText, SmallMutedText, SuccessText } from '../common/CustomTexts';
import Button from '../common/Button';
import CopyToClipboardButton from '../common/CopyToClipboardButton';
import buildRequestHeaders from '../../helpers/buildRequestHeaders';
import HttpStatus from '../../constants/http_status';

interface Props {
  currentApiKey?: string;
  generateApiKeyEndpoint: string;
  authenticityToken: string;
}

const GenerateApiKeyDialog = ({
  currentApiKey,
  generateApiKeyEndpoint,
  authenticityToken,
}: Props) => {
  const [hasBeenGenerated, setHasBeenGenerated] = React.useState(false);
  const [apiKey, setApiKey] = React.useState('');
  const [error, setError] = React.useState('');

  return (
    <>
    <h3>{I18n.t('common.forms.api_key.title')}</h3>

    {
      (currentApiKey && !hasBeenGenerated) &&
        <>
          <input type="disabled" readOnly value={currentApiKey} className="form-control" />
          <SmallMutedText>{I18n.t('common.forms.api_key.current_api_key_help')}</SmallMutedText>
        </>
    }

    {
      hasBeenGenerated ?
      <>
        <input type="disabled" readOnly value={apiKey} className="form-control" />
        <CopyToClipboardButton
          label={I18n.t('common.buttons.copy_to_clipboard')}
          textToCopy={apiKey}
          copiedLabel={I18n.t('common.copied')}
        />

        <SmallMutedText>{I18n.t('common.forms.api_key.generated_api_key_help')}</SmallMutedText>
        <br />
        <SuccessText>{I18n.t('common.forms.api_key.generated_api_key_successfully')}</SuccessText>
      </>
      :
      <>
        <br />
        <Button
          onClick={async () => {
            // If there is already an API key, ask for confirmation before generating a new one
            if (currentApiKey) {
              const confirmation = confirm(I18n.t('common.forms.api_key.confirm_generate_new_api_key'));
              if (!confirmation) return;
            }

            // Generate a new API key
            const res = await fetch(generateApiKeyEndpoint, {
              method: 'POST',
              headers: buildRequestHeaders(authenticityToken),
            });
            if (res.status === HttpStatus.Created) {
              const json = await res.json();
              setApiKey(json.api_key);
              setHasBeenGenerated(true);
            } else {
              setError(I18n.t('errors.unknown'));
            }
          }}
          className="btnPrimary apiKeyGenerateButton"
        >
          {I18n.t('common.forms.api_key.generate_api_key')}
        </Button>
      </>
    }

    { error && <DangerText>{error}</DangerText> }
    </>
  );
};

export default GenerateApiKeyDialog;