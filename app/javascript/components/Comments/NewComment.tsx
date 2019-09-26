import * as React from 'react';

import Button from '../shared/Button';
import Spinner from '../shared/Spinner';
import { DangerText } from '../shared/CustomTexts';

interface Props {
  body: string;
  parentId: number;
  isSubmitting: boolean;
  error: string;
  handleChange(e: React.FormEvent): void;
  handleSubmit(body: string, parentId: number): void;

  isLoggedIn: boolean;
}

const NewComment = ({
  body,
  parentId,
  isSubmitting,
  error,
  handleChange,
  handleSubmit,

  isLoggedIn,
}: Props) => (
  <React.Fragment>
    <div className="newCommentForm">
      {
        isLoggedIn ?
          <React.Fragment>
            <textarea
              value={body}
              onChange={handleChange}
              placeholder="Leave a comment"
              autoFocus
              className="newCommentBody"
            />
            <Button
              onClick={() => handleSubmit(body, parentId)}
              className="submitCommentButton">
              { isSubmitting ? <Spinner /> : 'Submit' }
            </Button>
          </React.Fragment>
        :
          <a href="/users/sign_in" className="loginInfo">You need to log in to post comments.</a>
      }
    </div>
    { error ? <DangerText>{error}</DangerText> : null }
  </React.Fragment>
);

export default NewComment;