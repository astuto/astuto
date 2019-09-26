import * as React from 'react';

import CommentsNumber from '../shared/CommentsNumber';
import PostStatusLabel from '../shared/PostStatusLabel';
import { DescriptionText } from '../shared/CustomTexts';

import IPostStatus from '../../interfaces/IPostStatus';

interface Props {
  id: number;
  title: string;
  description?: string;
  postStatus: IPostStatus;
  commentsCount: number;
}

const PostListItem = ({ id, title, description, postStatus, commentsCount }: Props) => (
  <a href={`/posts/${id}`} className="postLink">
    <div className="postListItem">
      <span className="postTitle">{title}</span>
      <DescriptionText limit={120}>{description}</DescriptionText>

      <div className="postDetails">
        <CommentsNumber number={commentsCount} />
        { postStatus ? <PostStatusLabel {...postStatus} /> : null }
      </div>
    </div>
  </a>
);

export default PostListItem;