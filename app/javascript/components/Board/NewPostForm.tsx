import * as React from 'react';
import I18n from 'i18n-js';

import Button from '../common/Button';

interface Props {
  title: string;
  description: string;
  handleTitleChange(title: string): void;
  handleDescriptionChange(description: string): void;
  handleSubmit(e: object): void;
}

const NewPostForm = ({
  title,
  description,
  handleTitleChange,
  handleDescriptionChange,
  handleSubmit,
  }: Props) => (
  <div className="newPostForm">
    <form>
      <div className="form-group">
        <label htmlFor="postTitle">{I18n.t('board.new_post.title')}</label>
        <input
          type="text"
          value={title}
          onChange={e => handleTitleChange(e.target.value)}

          id="postTitle"
          className="form-control"
          
          autoFocus
        />
      </div>
      <div className="form-group">
        <label htmlFor="postDescription">{I18n.t('board.new_post.description')}</label>
        <textarea
          value={description}
          onChange={e => handleDescriptionChange(e.target.value)}
          rows={3}

          className="form-control"
          id="postDescription"
        ></textarea>
      </div>
      <Button onClick={e => handleSubmit(e)} className="submitBtn d-block mx-auto">
        {I18n.t('board.new_post.submit_button')}
      </Button>
    </form>
  </div>
);

export default NewPostForm;