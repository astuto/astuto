import * as React from 'react';
import I18n from 'i18n-js';

import { MutedText } from '../shared/CustomTexts';

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
      <label htmlFor="isPostUpdateFlag">{I18n.t('post.new_comment.is_post_update')}</label>
    </div>
    {
      postUpdateFlagValue ?
        <MutedText>{I18n.t('post.new_comment.user_notification')}</MutedText>
      :
        null
    }
  </div>
);

export default NewCommentUpdateSection;