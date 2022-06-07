import * as React from 'react';
import I18n from 'i18n-js';

import PostStatusListItem from './PostStatusListItem';
import Spinner from '../common/Spinner';
import { DangerText } from '../common/CustomTexts';

import IPostStatus from '../../interfaces/IPostStatus';
import SidebarBox from '../common/SidebarBox';

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
  <SidebarBox title={I18n.t('board.filter_box.title')} customClass="postStatusFilterContainer">
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
  </SidebarBox>
);

export default PostStatusFilter;