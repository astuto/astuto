import * as React from 'react';

import ILike from '../../interfaces/ILike';
import Spinner from '../shared/Spinner';
import { DangerText } from '../shared/CustomTexts';

interface Props {
  likes: Array<ILike>;
  areLoading: boolean;
  error: string;
}

const LikeList = ({ likes, areLoading, error}: Props) => (
  <div className="likeList">
    { areLoading ? <Spinner /> : null }
    { error ? <DangerText>{error}</DangerText> : null }
    {
      likes.map((like, i) => (
        <div className="like" key={i}>
          {like.fullName}
        </div>
      ))
    }
  </div>
);

export default LikeList;