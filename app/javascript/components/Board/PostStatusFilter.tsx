import * as React from 'react';
import I18n from 'i18n-js';

import PostStatusListItem from './PostStatusListItem';
import Spinner from '../shared/Spinner';
import { BoxTitleText, DangerText } from '../shared/CustomTexts';

import IPostStatus from '../../interfaces/IPostStatus';

interface Props {
  postStatuses: Array<IPostStatus>;
  areLoading: boolean;
  error: string;
  
  handleFilterClick(postStatusId: number): void;
  currentFilter: number;
}

const PostStatusFilter = ({
  postStatuses,
  areLoading,
  error,
  
  handleFilterClick,
  currentFilter,
}: Props) => (
  <div className="postStatusFilterContainer sidebarCard">
    <BoxTitleText>{I18n.t('board.filter_box.title')}</BoxTitleText>
    {
      postStatuses.map((postStatus, i) => (
        <PostStatusListItem
          name={postStatus.name}
          color={postStatus.color}

          handleClick={() => handleFilterClick(postStatus.id)}
          isCurrentFilter={postStatus.id === currentFilter}
          handleResetFilter={() => handleFilterClick(0)}

          key={i}
        />
      ))
    }
    { areLoading ? <Spinner /> : null }
    { error ? <DangerText>{error}</DangerText> : null }
  </div>
);

export default PostStatusFilter;