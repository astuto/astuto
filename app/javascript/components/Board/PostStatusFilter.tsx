import * as React from 'react';

import PostStatusListItem from './PostStatusListItem';
import Spinner from '../shared/Spinner';

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
  <div className="box sidebar-box postStatusFilterContainer">
    <span className="smallTitle">Filter by post status:</span>

    { areLoading ? <Spinner /> : null }
    { error ? <span className="error">{error}</span> : null }
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
  </div>
);

export default PostStatusFilter;