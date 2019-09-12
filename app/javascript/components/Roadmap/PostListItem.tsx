import * as React from 'react';

interface Props {
  id: number;
  title: string;
  boardName: string;
}

const PostListItem = ({id, title, boardName}: Props) => (
  <a href={`/posts/${id}`} className="postLink">
    <div className="postListItem">
      <div className="postTitle">{title}</div>
      <div className="postBoard">{boardName}</div>
    </div>
  </a>
);

export default PostListItem;