import * as React from 'react';

import IPostStatus from '../../interfaces/IPostStatus';

interface Props {
  title: string;
  description?: string;
  postStatus: IPostStatus;
}

const PostListItem = ({ title, description, postStatus}: Props) => (
  <a href="#" className="postLink">
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
        {
          postStatus ?
            <div className="postDetailsStatus">
              <div className="dot" style={{backgroundColor: postStatus.color}}></div>
              <span className="postStatusName">{postStatus.name}</span>
            </div>
          :
            null
        }
      </div>
    </div>
  </a>
);

export default PostListItem;