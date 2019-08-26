import * as React from 'react';

import '../../stylesheets/components/Roadmap/PostListItem.scss';

interface Props {
  title: string;
  boardName: string;
}

const PostListItem = ({title, boardName}: Props) => (
  <a href="#" className="postLink">
    <div className="postListItem">
      <div className="postTitle">{title}</div>
      <div className="postBoard">{boardName}</div>
    </div>
  </a>
);

export default PostListItem;