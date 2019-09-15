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
  <div className={
    "postStatusListItemContainer " + `postStatus${name.replace(/ /g, '')} d-flex align-self-stretch`
  }>
    <a onClick={handleClick} className="postStatusListItemLink flex-grow-1">
      <div className="postStatusListItem p-1">
        <PostStatusLabel id={undefined} name={name} color={color} />
      </div>
    </a>
    {
      isCurrentFilter ?
        <button onClick={handleResetFilter}
        className="resetFilter btn btn-outline-dark">X</button>
      :
        null
    }
  </div>
);

export default PostStatusListItem;