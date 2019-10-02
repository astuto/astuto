import * as React from 'react';
import Gravatar from 'react-gravatar';

import NewComment from './NewComment';
import Separator from '../shared/Separator';
import { MutedText } from '../shared/CustomTexts';

import { ReplyFormState } from '../../reducers/replyFormReducer';

import friendlyDate from '../../helpers/friendlyDate';

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
  handleSubmitComment(body: string, parentId: number): void;

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
              { isPostUpdate ? 'No post update' : 'Post update' }
            </a>
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
          userEmail={currentUserEmail}
        />
        :
        null
    }
  </div>
);

export default Comment;