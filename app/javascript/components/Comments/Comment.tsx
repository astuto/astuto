import * as React from 'react';
import ReactMarkdown from 'react-markdown';
import Gravatar from 'react-gravatar';
import I18n from 'i18n-js';

import NewComment from './NewComment';
import Separator from '../common/Separator';
import { MutedText } from '../common/CustomTexts';

import { ReplyFormState } from '../../reducers/replyFormReducer';

import friendlyDate from '../../helpers/datetime';

interface Props {
  id: number;
  body: string;
  isPostUpdate: boolean;
  userFullName: string;
  userEmail: string;
  updatedAt: string;

  replyForm: ReplyFormState;
  handleToggleCommentReply(): void;
  handleCommentReplyBodyChange(e: React.FormEvent): void;
  handleToggleIsCommentUpdate(commentId: number, currentIsPostUpdate: boolean): void;
  handleSubmitComment(body: string, parentId: number, isPostUpdate: boolean): void;
  handleDeleteComment(id: number): void;

  isLoggedIn: boolean;
  isPowerUser: boolean;
  currentUserEmail: string;
}

const Comment = ({
  id,
  body,
  isPostUpdate,
  userFullName,
  userEmail,
  updatedAt,

  replyForm,
  handleToggleCommentReply,
  handleCommentReplyBodyChange,
  handleToggleIsCommentUpdate,
  handleSubmitComment,
  handleDeleteComment,

  isLoggedIn,
  isPowerUser,
  currentUserEmail,
}: Props) => (
  <div className="comment">
    <div className="commentHeader">
      <Gravatar email={userEmail} size={28} className="gravatar" />
      <span className="commentAuthor">{userFullName}</span>
      {
        isPostUpdate ?
          <span className="postUpdateBadge">
            {I18n.t('post.comments.post_update_badge')}
          </span>
        :
          null
      }
    </div>

    <ReactMarkdown
      className="commentBody"
      disallowedTypes={['heading', 'image', 'html']}
      unwrapDisallowed
    >
      {body}
    </ReactMarkdown>

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
        isPowerUser ?
          <>
            <Separator />
            <a
              onClick={() => handleToggleIsCommentUpdate(id, isPostUpdate)}
              className="commentLink"
            >
              { 'Post update: ' + (isPostUpdate ? 'yes' : 'no') }
            </a>
            <Separator />
            <a href={`/admin/comments/${id}/edit`} className="commentLink" data-turbolinks="false">
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
      <MutedText>{friendlyDate(updatedAt)}</MutedText>
    </div>
    {
      replyForm.isOpen ?
        <NewComment
          body={replyForm.body}
          parentId={id}
          postUpdateFlagValue={replyForm.isPostUpdate}
          isSubmitting={replyForm.isSubmitting}
          error={replyForm.error}
          handleChange={handleCommentReplyBodyChange}
          handlePostUpdateFlag={() => null}
          handleSubmit={handleSubmitComment}

          isLoggedIn={isLoggedIn}
          isPowerUser={isPowerUser}
          userEmail={currentUserEmail}
        />
        :
        null
    }
  </div>
);

export default Comment;