import * as React from 'react';
import I18n from 'i18n-js';
import { useState } from 'react';
import ActionLink from './ActionLink';
import { CopyIcon, DoneIcon } from './Icons';

interface Props {
  label: string;
  textToCopy: string;
  copiedLabel?: string;
}

const CopyToClipboardButton = ({
  label,
  textToCopy,
  copiedLabel = I18n.t('common.copied')
}: Props) => {
  const [ready, setReady] = useState(true);

  const alertError = () =>
    alert(`Error in automatically copying to clipboard. Please copy the callback url manually:\n\n${textToCopy}`);

  return (
    ready ?
      <ActionLink
        onClick={() => {
          if (navigator.clipboard) {
            navigator.clipboard.writeText(textToCopy).then(() => {
              setReady(false);
              setTimeout(() => setReady(true), 2000);
            },
            alertError);
          } else {
            alertError();
          }
        }}
        icon={<CopyIcon />}
      >
        {label}
      </ActionLink>
    :
      <span style={{display: 'flex', marginRight: 12}}>
        {copiedLabel}
      </span>
  );
};

export default CopyToClipboardButton;