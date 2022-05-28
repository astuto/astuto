import * as React from 'react';
import { MutedText } from '../shared/CustomTexts';

import I18n from 'i18n-js';

interface Props {
  postUpdateFlagValue: boolean;
  handlePostUpdateFlag(): void;
}

const NewCommentUpdateSection = ({
  postUpdateFlagValue,
  handlePostUpdateFlag,
}: Props) => (
  <div className="commentIsUpdateForm">
    <div>
      <input
        id="isPostUpdateFlag"
        type="checkbox"
        onChange={handlePostUpdateFlag}
        checked={postUpdateFlagValue || false}
      />
      &nbsp;
      <label htmlFor="isPostUpdateFlag">Mark as post update</label>
    </div>
    {
      postUpdateFlagValue ?
        <MutedText>{I18n.t('components.new_comment.user_notification')}</MutedText>
      :
        null
    }
  </div>
);

export default NewCommentUpdateSection;