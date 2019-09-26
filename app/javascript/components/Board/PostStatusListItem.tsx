import * as React from 'react';

import PostStatusLabel from '../shared/PostStatusLabel';
import Button from '../shared/Button';

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
    "postStatusListItemContainer " + `postStatus${name.replace(/ /g, '')}`
  }>
    <a onClick={handleClick} className="postStatusListItemLink">
      <div className="postStatusListItem">
        <PostStatusLabel name={name} color={color} />
      </div>
    </a>
    {
      isCurrentFilter ?
        <Button onClick={handleResetFilter} className="resetFilter" outline>
          X
        </Button>
      :
        null
    }
  </div>
);

export default PostStatusListItem;