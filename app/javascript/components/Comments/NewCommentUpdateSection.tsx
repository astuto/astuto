import * as React from 'react';
import I18n from 'i18n-js';

import { MutedText } from '../common/CustomTexts';
import Switch from '../common/Switch';

interface Props {
  postUpdateFlagValue: boolean;
  handlePostUpdateFlag(): void;
}

const NewCommentUpdateSection = ({
  postUpdateFlagValue,
  handlePostUpdateFlag,
}: Props) => (
  <div className="commentIsUpdateForm">
    <Switch
      htmlId="isPostUpdateFlag"
      onClick={handlePostUpdateFlag}
      checked={postUpdateFlagValue || false}
      label={I18n.t('post.new_comment.is_post_update')}
    />
    {
      postUpdateFlagValue &&
        <MutedText>{I18n.t('post.new_comment.user_notification')}</MutedText>
    }
  </div>
);

export default NewCommentUpdateSection;