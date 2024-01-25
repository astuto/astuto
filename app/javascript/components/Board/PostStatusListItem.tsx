import * as React from 'react';

import PostStatusLabel from '../common/PostStatusLabel';
import Button from '../common/Button';
import { CancelIcon } from '../common/Icons';

interface Props {
  name: string;
  color: string;

  handleClick(): void;
  isCurrentFilter: boolean;
}

const PostStatusListItem = ({
  name,
  color,
  handleClick,
  isCurrentFilter,
}: Props) => (
  <div className={
    "postStatusListItemContainer " + `postStatus${name.replace(/ /g, '')}`
  }>
    <a onClick={handleClick} className="postStatusListItemLink">
      <div className={`postStatusListItem${isCurrentFilter ? ' postStatusListItemSelected' : ''}`}>
        <PostStatusLabel name={name} color={color} />
      </div>
    </a>
    {
      isCurrentFilter ?
        <Button onClick={handleClick} className="resetFilter" outline>
          X
        </Button>
      :
        null
    }
  </div>
);

export default PostStatusListItem;