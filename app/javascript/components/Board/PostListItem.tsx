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
    <div className="postListItem d-flex flex-column justify-content-between m-0 px-2 py-1">
      <TitleText>{title}</TitleText>
      <DescriptionText limit={120}>{description}</DescriptionText>

      <div className="postDetails d-flex justify-content-between text-uppercase">
        <CommentsNumber number={0} />
        { postStatus ? <PostStatusLabel {...postStatus} /> : null }
      </div>
    </div>
  </a>
);

export default PostListItem;