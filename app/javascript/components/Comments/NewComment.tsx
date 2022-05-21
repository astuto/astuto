import * as React from 'react';
import Gravatar from 'react-gravatar';

import NewCommentUpdateSection from './NewCommentUpdateSection';

import Button from '../shared/Button';
import Spinner from '../shared/Spinner';
import { DangerText } from '../shared/CustomTexts';

interface Props {
  body: string;
  parentId: number;
  postUpdateFlagValue: boolean;
  isSubmitting: boolean;
  error: string;
  handleChange(e: React.FormEvent): void;
  handlePostUpdateFlag(): void;
  handleSubmit(
    body: string,
    parentId: number,
    isPostUpdate: boolean
  ): void;

  isLoggedIn: boolean;
  isPowerUser: boolean;
  userEmail: string;
}

const NewComment = ({
  body,
  parentId,
  postUpdateFlagValue,
  isSubmitting,
  error,
  handleChange,
  handlePostUpdateFlag,
  handleSubmit,

  isLoggedIn,
  isPowerUser,
  userEmail,
}: Props) => (
  <React.Fragment>
    <div className="newCommentForm">
      {
        isLoggedIn ?
          <React.Fragment>
            <div className="commentBodyForm">
              <Gravatar email={userEmail} size={36} className="currentUserAvatar" />
              <textarea
                value={body}
                onChange={handleChange}
                placeholder="Leave a comment"
                className="newCommentBody"
              />
              <Button
                onClick={() => handleSubmit(body, parentId, postUpdateFlagValue)}
                className="submitCommentButton">
                { isSubmitting ? <Spinner color="light" /> : 'Submit' }
              </Button>
            </div>
            {
              isPowerUser && parentId == null ?
                <NewCommentUpdateSection
                  postUpdateFlagValue={postUpdateFlagValue}
                  handlePostUpdateFlag={handlePostUpdateFlag}
                />
              :
                null
            }
          </React.Fragment>
        :
          <a href="/users/sign_in" className="loginInfo">You need to log in to post comments.</a>
      }
    </div>
    { error ? <DangerText>{error}</DangerText> : null }
  </React.Fragment>
);

export default NewComment;