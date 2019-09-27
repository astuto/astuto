import * as React from 'react';

import LikeButton from '../../containers/LikeButton';
import CommentsNumber from '../shared/CommentsNumber';
import PostStatusLabel from '../shared/PostStatusLabel';
import { DescriptionText } from '../shared/CustomTexts';

import IPostStatus from '../../interfaces/IPostStatus';

interface Props {
  id: number;
  title: string;
  description?: string;
  postStatus: IPostStatus;
  likesCount: number;
  liked: number;
  commentsCount: number;

  isLoggedIn: boolean;
  authenticityToken: string;
}

const PostListItem = ({
  id,
  title,
  description,
  postStatus,
  likesCount,
  liked,
  commentsCount,

  isLoggedIn,
  authenticityToken,
}: Props) => (
  <React.Fragment>
    <LikeButton
      postId={id}
      likesCount={likesCount}
      liked={liked}
      isLoggedIn={isLoggedIn}
      authenticityToken={authenticityToken}
    />
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
  </React.Fragment>
);

export default PostListItem;