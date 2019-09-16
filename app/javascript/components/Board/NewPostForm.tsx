import * as React from 'react';

import Button from '../shared/Button';

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
        <label htmlFor="postTitle">Title</label>
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
        <label htmlFor="postDescription">Description (optional)</label>
        <textarea
          value={description}
          onChange={e => handleDescriptionChange(e.target.value)}
          rows={3}

          className="form-control"
          id="postDescription"
        ></textarea>
      </div>
      <Button onClick={e => handleSubmit(e)} className="submitBtn d-block mx-auto">
        Submit feedback
      </Button>
    </form>
  </div>
);

export default NewPostForm;