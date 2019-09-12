import * as React from 'react';

import PostStatusLabel from '../shared/PostStatusLabel';

interface Props {
  name: string;
  color: string;

  handleClick(): void;
  isCurrentFilter: boolean;
  handleResetFilter(): void;
}

const PostStatusListItem = ({
  name,
  color,
  handleClick,
  isCurrentFilter,
  handleResetFilter,
}: Props) => (
  <div className={"postStatusListItemContainer " + `postStatus${name.replace(/ /g, '')}`}>
    <a onClick={handleClick} className="postStatusListItemLink">
      <div className="postStatusListItem">
        <PostStatusLabel id={undefined} name={name} color={color} />
      </div>
    </a>
    {
      isCurrentFilter ?
        <button onClick={handleResetFilter} className="btn btn-outline-dark resetFilter">X</button> : null
    }
  </div>
);

export default PostStatusListItem;