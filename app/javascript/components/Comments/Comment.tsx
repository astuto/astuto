import * as React from 'react';

import NewComment from './NewComment';
import Separator from '../shared/Separator';
import { MutedText } from '../shared/CustomTexts';

import { ReplyFormState } from '../../reducers/replyFormReducer';

import friendlyDate from '../../helpers/friendlyDate';

interface Props {
  id: number;
  body: string;
  userFullName: string;
  updatedAt: string;

  replyForm: ReplyFormState;
  handleToggleCommentReply(): void;
  handleCommentReplyBodyChange(e: React.FormEvent): void;
  handleSubmitComment(body: string, parentId: number): void;

  isLoggedIn: boolean;
  isPowerUser: boolean;
}

const Comment = ({
  id,
  body,
  userFullName,
  updatedAt,

  replyForm,
  handleToggleCommentReply,
  handleCommentReplyBodyChange,
  handleSubmitComment,

  isLoggedIn,
  isPowerUser,
}: Props) => (
  <div className="comment">
    <div className="commentHeader">
      <span className="commentAuthor">{userFullName}</span>
    </div>
    <p className="commentBody">{body}</p>
    <div className="commentFooter">
      <a className="commentReplyButton" onClick={handleToggleCommentReply}>
        { replyForm.isOpen ? 'Cancel' : 'Reply' }
      </a>
      {
        isPowerUser ?
          <React.Fragment>
            <Separator />
            <a href={`/admin/comments/${id}`} data-turbolinks="false">Edit</a>
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
          isSubmitting={replyForm.isSubmitting}
          error={replyForm.error}
          handleChange={handleCommentReplyBodyChange}
          handleSubmit={handleSubmitComment}

          isLoggedIn={isLoggedIn}
        />
        :
        null
    }
  </div>
);

export default Comment;