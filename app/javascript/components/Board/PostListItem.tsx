import * as React from 'react';

import CommentsNumber from '../shared/CommentsNumber';
import PostStatusLabel from '../shared/PostStatusLabel';
import { TitleText, DescriptionText } from '../shared/CustomTexts';

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
      <span className="postTitle">{title}</span>
      <DescriptionText limit={120}>{description}</DescriptionText>

      <div className="postDetails">
        <CommentsNumber number={0} />
        { postStatus ? <PostStatusLabel {...postStatus} /> : null }
      </div>
    </div>
  </a>
);

export default PostListItem;