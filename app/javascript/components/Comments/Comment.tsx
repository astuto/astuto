import * as React from 'react';

import NewComment from './NewComment';
import Separator from '../shared/Separator';
import { MutedText } from '../shared/CustomTexts';

import { CommentRepliesState } from '../../reducers/commentRepliesReducer';

import friendlyDate from '../../helpers/friendlyDate';

interface Props {
  id: number;
  body: string;
  userFullName: string;
  updatedAt: string;

  reply: CommentRepliesState;
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

  reply,
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
        { reply.isOpen ? 'Cancel' : 'Reply' }
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
      reply.isOpen ?
        <NewComment
          body={reply.body}
          parentId={id}
          isSubmitting={reply.isSubmitting}
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