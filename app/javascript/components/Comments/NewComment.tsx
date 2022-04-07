import * as React from 'react';
import Gravatar from 'react-gravatar';

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
  userEmail: string;
}

const NewComment = ({
  body,
  parentId,
  isSubmitting,
  error,
  handleChange,
  handleSubmit,

  isLoggedIn,
  userEmail,
}: Props) => (
  <React.Fragment>
    <div className="newCommentForm">
      {
        isLoggedIn ?
          <React.Fragment>
            <Gravatar email={userEmail} size={36} className="currentUserAvatar" />
            <textarea
              value={body}
              onChange={handleChange}
              placeholder="Leave a comment"
              className="newCommentBody"
            />
            <Button
              onClick={() => handleSubmit(body, parentId)}
              className="submitCommentButton">
              { isSubmitting ? <Spinner color="light" /> : 'Submit' }
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