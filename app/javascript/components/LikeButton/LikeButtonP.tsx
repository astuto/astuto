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
    <button onClick={() =>
      isLoggedIn ?
        handleLikeSubmit(postId, !liked, authenticityToken)
        :
        window.location.href = `/users/sign_in`
    }>
      { liked ? 'down' : 'up' }
    </button>
    <span className="likesCountLabel">{likesCount}</span>
  </div>
);

export default LikeButtonP;