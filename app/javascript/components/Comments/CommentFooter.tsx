import * as React from 'react';
import I18n from 'i18n-js';

import Separator from '../common/Separator';
import { MutedText } from '../common/CustomTexts';
import friendlyDate from '../../helpers/datetime';
import { ReplyFormState } from '../../reducers/replyFormReducer';

interface Props {
  id: number;
  createdAt: string;
  updatedAt: string;
  replyForm: ReplyFormState;
  isPowerUser: boolean;
  currentUserEmail: string;
  commentAuthorEmail: string;

  handleDeleteComment(id: number): void;
  handleToggleCommentReply(): void;
  toggleEditMode(): void;
}

const CommentFooter = ({
  id,
  createdAt,
  updatedAt,
  replyForm,
  isPowerUser,
  currentUserEmail,
  commentAuthorEmail,
  
  handleDeleteComment,
  handleToggleCommentReply,
  toggleEditMode,
}: Props) => (
  <div className="commentFooter">
    <a className="commentReplyButton commentLink" onClick={handleToggleCommentReply}>
      {
        replyForm.isOpen ?
          I18n.t('common.buttons.cancel')
        :
          I18n.t('post.comments.reply_button')
      }
    </a>
    {
      isPowerUser || currentUserEmail === commentAuthorEmail ?
        <>
          <Separator />
          <a onClick={toggleEditMode} className="commentLink">
            {I18n.t('common.buttons.edit')}
          </a>

          <Separator />
          <a
            onClick={() => confirm(I18n.t('common.confirmation')) && handleDeleteComment(id)}
            className="commentLink">
              {I18n.t('common.buttons.delete')}
          </a>
        </>
      :
        null
    }
    <Separator />
    <MutedText>{friendlyDate(createdAt)}</MutedText>

    {
      createdAt !== updatedAt ?
        <>
          <Separator />
          <MutedText>{ I18n.t('common.edited').toLowerCase() }</MutedText>
        </>
      :
        null
    }
  </div>
);

export default CommentFooter;