import * as React from 'react';
import { FormEvent } from 'react';

import { MutedText } from '../shared/CustomTexts';

import { CommentRepliesState } from '../../reducers/commentRepliesReducer';

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
}: Props) => (
  <div className="comment">
    <div className="commentHeader">
      <span className="commentAuthor">{userFullName}</span>
    </div>
    <p className="commentBody">{body}</p>
    <div className="commentFooter">
      <a onClick={handleToggleCommentReply}>Reply</a>
      <MutedText>{updatedAt}</MutedText>
    </div>
    {
      reply.isOpen ?
        <textarea
          value={reply.body}
          onChange={handleCommentReplyBodyChange}
        />
        :
        null
    }
  </div>
);

export default Comment;