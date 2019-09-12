import * as React from 'react';

import PostStatusLabel from '../shared/PostStatusLabel';

import IPostStatus from '../../interfaces/IPostStatus';

interface Props {
  id: number;
  title: string;
  description?: string;
  postStatus: IPostStatus;
}

const PostListItem = ({ id, title, description, postStatus}: Props) => (
  <a href={`/posts/${id}`} className="postLink">
    <div className="postListItem">
      <div className="postTitle">{title}</div>
      <div className="postDescription">
        {
          description && description.length > 120  ?
            description.slice(0, 119) + '...'
          :
            description || '<No description provided.>'
        }
      </div>
      <div className="postDetails">
        <div className="postDetailsComments">
          <span className="comment icon"></span>
          <span>0 comments</span>
        </div>
        { postStatus ? <PostStatusLabel {...postStatus} /> : null }
      </div>
    </div>
  </a>
);

export default PostListItem;