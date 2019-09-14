import * as React from 'react';
import { FormEvent } from 'react';

import IPostStatus from '../../interfaces/IPostStatus';

interface Props {
  postStatuses: Array<IPostStatus>;
  selectedPostStatusId: number;
  
  handleChange(
    newPostStatusId: number,
  ): void;
}

const PostStatusSelect = ({
  postStatuses,
  selectedPostStatusId,
  handleChange,
}: Props) => (
  <React.Fragment>
    <label htmlFor="postStatusSelect">Status:</label>
    <select
      value={selectedPostStatusId || 'none'}
      onChange={
        (e: FormEvent) => (
          handleChange(parseInt((e.target as HTMLSelectElement).value))
      )}
      id="postStatusSelect"
      className="selectPicker"
    >
      {postStatuses.map((postStatus, i) => (
        <option value={postStatus.id} key={i}>
          {postStatus.name}
        </option>
      ))}
      <option value="none">None</option>
    </select>
  </React.Fragment>
);

export default PostStatusSelect;