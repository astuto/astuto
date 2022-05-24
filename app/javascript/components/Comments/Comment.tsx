import * as React from 'react';
import Gravatar from 'react-gravatar';

import NewComment from './NewComment';
import Separator from '../shared/Separator';
import { MutedText } from '../shared/CustomTexts';

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

  isLoggedIn,
  isPowerUser,
  currentUserEmail,
}: Props) => (
  <div className="comment">
    <div className="commentHeader">
      <Gravatar email={userEmail} size={24} className="gravatar" />
      <span className="commentAuthor">{userFullName}</span>
      { isPostUpdate ? <span className="postUpdateBadge">Post update</span> : null }
    </div>
    <p className="commentBody">{body}</p>
    <div className="commentFooter">
      <a className="commentReplyButton commentLink" onClick={handleToggleCommentReply}>
        { replyForm.isOpen ? 'Cancel' : 'Reply' }
      </a>
      {
        isPowerUser ?
          <React.Fragment>
            <Separator />
            <a
              onClick={() => handleToggleIsCommentUpdate(id, isPostUpdate)}
              className="commentLink"
            >
              { 'Post update: ' + (isPostUpdate ? 'yes' : 'no') }
            </a>
            <Separator />
            <a href={`/admin/comments/${id}/edit`} className="commentLink" data-turbolinks="false">Edit</a>
            <Separator />
            <a
              href={`/admin/comments/${id}`}
              className="commentLink"
              data-method="delete"
              data-confirm="Are you sure?"
              data-turbolinks="false">Delete</a>

          </React.Fragment>
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