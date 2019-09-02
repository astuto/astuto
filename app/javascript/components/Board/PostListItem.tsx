import * as React from 'react';

interface Props {
  title: string;
  description?: string;
  postStatus: {name: string, color: string};
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
        <div className="postDetailsStatus" style={{color: postStatus.color}}>
          <div className="dot" style={{backgroundColor: postStatus.color}}></div>
          <span className="postStatusName">{postStatus.name}</span>
        </div>
      </div>
    </div>
  </a>
);

export default PostListItem;