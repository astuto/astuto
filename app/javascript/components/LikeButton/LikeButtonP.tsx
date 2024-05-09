import * as React from 'react';
import { LikeIcon, SolidLikeIcon } from '../common/Icons';

interface Props {
  postId: number;
  likeCount: number;
  showLikeCount?: boolean;
  showLikeButton?: boolean;
  liked: number;
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
      { liked ? <SolidLikeIcon /> : <LikeIcon />}
    </div>
    { showLikeCount && <span className="likeCountLabel">{likeCount}</span> }
  </div>
);

export default LikeButtonP;