import * as React from 'react';
import I18n from 'i18n-js';

interface Props {
  number: number;
}

const CommentsNumber = ({ number }: Props) => (
  <span className="badge badgeLight">
    {I18n.t('common.comments_number', { count: number })}
  </span>
);

export default CommentsNumber;