import * as React from 'react';
import Gravatar from 'react-gravatar';
import I18n from 'i18n-js';

import NewCommentUpdateSection from './NewCommentUpdateSection';

import Button from '../common/Button';
import Spinner from '../common/Spinner';
import { DangerText } from '../common/CustomTexts';

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
  <>
    <div className="newCommentForm">
      {
        isLoggedIn ?
          <>
            <div className="commentBodyForm">
              <Gravatar email={userEmail} size={48} className="currentUserAvatar" />
              <textarea
                value={body}
                onChange={handleChange}
                autoFocus={parentId != null}
                placeholder={I18n.t('post.new_comment.body_placeholder')}
                className="commentForm"
              />
              <Button
                onClick={() => handleSubmit(body, parentId, postUpdateFlagValue)}
                className="submitCommentButton">
                { isSubmitting ? <Spinner color="light" /> : I18n.t('post.new_comment.submit_button') }
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
          </>
        :
          <a href="/users/sign_in" className="loginInfo">
            {I18n.t('post.new_comment.not_logged_in')}
          </a>
      }
    </div>

    { error ? <DangerText>{error}</DangerText> : null }
  </>
);

export default NewComment;