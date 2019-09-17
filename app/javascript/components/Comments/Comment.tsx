import * as React from 'react';

import { MutedText } from '../shared/CustomTexts';

interface Props {
  id: number;
  body: string;
  parentId: number;
  userFullName: string;
  updatedAt: string;

  level: number;
}

const Comment = ({
  id,
  body,
  parentId,
  userFullName,
  updatedAt,

  level,
}: Props) => (
  <div className="comment">
    <div className="commentHeader">
      <span className="commentAuthor">{userFullName}</span>
    </div>
    <p className="commentBody">{body}</p>
    <div className="commentFooter">
      <a href="#">Reply</a>
      <MutedText>{updatedAt}</MutedText>
    </div>
  </div>
);

export default Comment;