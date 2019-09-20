import * as React from 'react';
import { FormEvent } from 'react';

import NewComment from './NewComment';
import { MutedText } from '../shared/CustomTexts';

import { CommentRepliesState } from '../../reducers/commentRepliesReducer';

import friendlyDate from '../../helpers/friendlyDate';

interface Props {
  id: number;
  body: string;
  parentId: number;
  userFullName: string;
  updatedAt: string;

  level: number;
  reply: CommentRepliesState;
  handleToggleCommentReply(): void;
  handleCommentReplyBodyChange(e: FormEvent): void;
  handleSubmitComment(body: string, parentId: number): void;

  isLoggedIn: boolean;
}

const Comment = ({
  id,
  body,
  parentId,
  userFullName,
  updatedAt,

  level,
  reply,
  handleToggleCommentReply,
  handleCommentReplyBodyChange,
  handleSubmitComment,

  isLoggedIn,
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
      &nbsp;&bull;&nbsp;
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