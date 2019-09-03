import * as React from 'react';

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
        <div className="dot" style={{backgroundColor: color}}></div>
        <span className="postStatusName" style={{color: color}}>{name}</span>
      </div>
    </a>
    {
      isCurrentFilter ?
        <button onClick={handleResetFilter} className="btn btn-outline-dark resetFilter">X</button> : null
    }
  </div>
);

export default PostStatusListItem;