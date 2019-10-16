import * as React from 'react';
import Gravatar from 'react-gravatar';

import ILike from '../../interfaces/ILike';
import Spinner from '../shared/Spinner';
import {
  TitleText,
  DangerText,
  CenteredMutedText
} from '../shared/CustomTexts';

interface Props {
  likes: Array<ILike>;
  areLoading: boolean;
  error: string;
}

const LikeList = ({ likes, areLoading, error}: Props) => (
  <div className="likeListContainer">
    <TitleText>People who liked</TitleText>
    { areLoading ? <Spinner /> : null }
    { error ? <DangerText>{error}</DangerText> : null }
    <div className="likeList">
      { likes.length === 0 ? <CenteredMutedText>There are no likes yet.</CenteredMutedText> : null }
      {
        likes.map((like, i) => (
          <div className="likeListItem" key={i}>
            <Gravatar email={like.email} size={28} className="gravatar" />
            <span className="likeListItemName">{like.fullName}</span>
          </div>
        ))
      }
    </div>
  </div>
);

export default LikeList;