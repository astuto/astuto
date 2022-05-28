import * as React from 'react';
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
      <label htmlFor="isPostUpdateFlag">Mark as post update</label>
    </div>
    {
      postUpdateFlagValue ?
        <MutedText>Users that follow this post will be notified</MutedText>
      :
        null
    }
  </div>
);

export default NewCommentUpdateSection;