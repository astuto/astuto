import * as React from 'react';
import { FormEvent } from 'react';

import Button from '../shared/Button';

interface Props {
  body: string;
  parentId: number;
  handleChange(e: FormEvent): void;
  handleSubmit(body: string, parentId: number): void;
}

const NewComment = ({
  body,
  parentId,
  handleChange,
  handleSubmit,
}: Props) => (
  <div className="newCommentForm">
    <textarea
      value={body}
      onChange={handleChange}
      placeholder="Leave a comment"
      className="newCommentBody"
    />
    <Button
      onClick={() => handleSubmit(body, parentId)}
      className="submitCommentButton">
      Submit
    </Button>
  </div>
);

export default NewComment;