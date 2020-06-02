import * as React from 'react';

import Button from '../shared/Button';

import I18n from 'i18n-js';

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
        <label htmlFor="postTitle">{I18n.t('javascript.components.board.new_post_form.title')}</label>
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
        <label htmlFor="postDescription">{I18n.t('javascript.components.board.new_post_form.description_optional')}</label>
        <textarea
          value={description}
          onChange={e => handleDescriptionChange(e.target.value)}
          rows={3}

          className="form-control"
          id="postDescription"
        ></textarea>
      </div>
      <Button onClick={e => handleSubmit(e)} className="submitBtn d-block mx-auto">
        {I18n.t('javascript.components.board.new_post_form.submit_feedback')}
      </Button>
    </form>
  </div>
);

export default NewPostForm;