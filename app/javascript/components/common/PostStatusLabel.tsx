import * as React from 'react';
import I18n from 'i18n-js';

interface Props {
  name: string;
  color: string;
}

const PostStatusLabel = ({
  name,
  color,
}: Props) => (
  <span className="badge" style={{backgroundColor: color || 'black', color: 'white'}}>
    {(name || I18n.t('common.no_status')).toUpperCase()}
  </span>
);

export default PostStatusLabel;