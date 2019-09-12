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
    value={selectedPostStatusId || 'none'}
    onChange={
      (e: FormEvent) => (
        handleChange(parseInt((e.target as HTMLSelectElement).value))
    )}
    className="selectPicker"
  >
    {postStatuses.map((postStatus, i) => (
      <option value={postStatus.id} key={i}>
        {postStatus.name}
      </option>
    ))}
    <option value="none">None</option>
  </select>
);

export default PostStatusSelect;