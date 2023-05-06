import * as React from 'react';
import I18n from 'i18n-js';

import IPostStatus from '../../interfaces/IPostStatus';
import { getLabel } from '../../helpers/formUtils';

const NO_POST_STATUS_VALUE = 'none';

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
    value={selectedPostStatusId || NO_POST_STATUS_VALUE}
    onChange={
      (e: React.FormEvent) => (
        handleChange(parseInt((e.target as HTMLSelectElement).value))
    )}
    id="selectPickerStatus"
    className="selectPicker"
  >
    <optgroup label={getLabel('post_status')}>
      {postStatuses.map((postStatus, i) => (
        <option value={postStatus.id} key={i}>
          {postStatus.name}
        </option>
      ))}
    </optgroup>
    <option value={NO_POST_STATUS_VALUE}>
      {I18n.t('post.post_status_select.no_post_status')}
    </option>
  </select>
);

export default PostStatusSelect;