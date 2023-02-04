import * as React from 'react';
import ReactMarkdown from 'react-markdown';

import LikeButton from '../../containers/LikeButton';
import CommentsNumber from '../common/CommentsNumber';
import PostStatusLabel from '../common/PostStatusLabel';

import IPostStatus from '../../interfaces/IPostStatus';

interface Props {
  id: number;
  title: string;
  description?: string;
  postStatus: IPostStatus;
  likeCount: number;
  showLikeCount: boolean;
  showLikeButtons: boolean;
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
  likeCount,
  showLikeCount,
  showLikeButtons,
  liked,
  commentsCount,

  isLoggedIn,
  authenticityToken,
}: Props) => (
  <div onClick={() => window.location.href = `/posts/${id}`} className="postListItem">
    <LikeButton
      postId={id}
      likeCount={likeCount}
      showLikeCount={showLikeCount}
      showLikeButton={showLikeButtons}
      liked={liked}
      isLoggedIn={isLoggedIn}
      authenticityToken={authenticityToken}
    />

    <div className="postContainer">
      <span className="postTitle">{title}</span>
        <ReactMarkdown className="descriptionText" allowedTypes={['text']} unwrapDisallowed>
          {description?.slice(0, 120)}
        </ReactMarkdown>

      <div className="postDetails">
        <CommentsNumber number={commentsCount} />
        { postStatus ? <PostStatusLabel {...postStatus} /> : null }
      </div>
    </div>
  </div>
);

export default PostListItem;