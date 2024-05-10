import * as React from 'react';
import { LikeIcon, SolidLikeIcon } from '../common/Icons';

interface Props {
  postId: number;
  likeCount: number;
  showLikeCount?: boolean;
  showLikeButton?: boolean;
  liked: number;
  size: 'medium' | 'large';
  handleLikeSubmit(
    postId: number,
    isLike: boolean,
    authenticityToken: string,
  ): void;
  authenticityToken: string;
  isLoggedIn: boolean;
}

const LikeButtonP = ({
  postId,
  likeCount,
  showLikeCount = true,
  showLikeButton = true,
  liked,
  size,
  handleLikeSubmit,
  authenticityToken,
  isLoggedIn,
}: Props) => (
  <div className="likeButtonContainer">
    <div onClick={(e) => {
      e.stopPropagation();
      
      if (isLoggedIn) handleLikeSubmit(postId, !liked, authenticityToken);
      else window.location.href = `/users/sign_in`;
      }}
      className={`likeButton${liked ? ' liked' : ''}`}
      hidden={!showLikeButton}
    >
      { liked ? <SolidLikeIcon size={size === 'medium' ? 26 : 36} /> : <LikeIcon size={size === 'medium' ? 26 : 36} />}
    </div>
    { showLikeCount && <span className={`likeCountLabel likeCountLabel-${size}`}>{likeCount}</span> }
  </div>
);

export default LikeButtonP;