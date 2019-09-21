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
  <select
    value={selectedPostStatusId || 'Loading...'}
    onChange={
      (e: FormEvent) => (
        handleChange(parseInt((e.target as HTMLSelectElement).value))
    )}
    id="selectPickerStatus"
    className="selectPicker"
  >
    <optgroup label="Post statuses">
      {postStatuses.map((postStatus, i) => (
        <option value={postStatus.id} key={i}>
          {postStatus.name}
        </option>
      ))}
    </optgroup>
    <optgroup label="No post status">
      <option value="none">None</option>
    </optgroup>
  </select>
);

export default PostStatusSelect;