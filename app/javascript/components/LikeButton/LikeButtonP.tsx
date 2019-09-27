import * as React from 'react';

interface Props {
  postId: number;
  likesCount: number;
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
  likesCount,
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
    >
    </div>
    <span className="likesCountLabel">{likesCount}</span>
  </div>
);

export default LikeButtonP;