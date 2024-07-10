import * as React from 'react';
import I18n from 'i18n-js';

import Button from '../common/Button';
import { SmallMutedText } from '../common/CustomTexts';

interface Props {
  title: string;
  description: string;
  currentUserFullName: string;
  isSubmissionAnonymous: boolean;
  handleTitleChange(title: string): void;
  handleDescriptionChange(description: string): void;
  handleSubmit(e: object): void;
}

const NewPostForm = ({
  title,
  description,
  currentUserFullName,
  isSubmissionAnonymous,
  handleTitleChange,
  handleDescriptionChange,
  handleSubmit,
  }: Props) => (
  <div className="newPostForm">
    <form>
      <div className="form-group">
        <input
          type="text"
          value={title}
          onChange={e => handleTitleChange(e.target.value)}
          maxLength={128}
          placeholder={I18n.t('board.new_post.title')}

          id="postTitle"
          className="form-control"
          
          autoFocus
        />
      </div>
      <div className="form-group">
        <textarea
          value={description}
          onChange={e => handleDescriptionChange(e.target.value)}
          rows={3}
          placeholder={I18n.t('board.new_post.description')}

          className="form-control"
          id="postDescription"
        ></textarea>
      </div>

      <Button onClick={e => handleSubmit(e)} className="submitBtn d-block mx-auto">
        {I18n.t('board.new_post.submit_button')}
      </Button>

      <SmallMutedText>
        {
          isSubmissionAnonymous ?
            I18n.t('board.new_post.anonymous_submission_help')
          :
            I18n.t('board.new_post.non_anonymous_submission_help', { name: currentUserFullName })
        }
      </SmallMutedText>
    </form>
  </div>
);

export default NewPostForm;