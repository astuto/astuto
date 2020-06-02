import * as React from 'react';
import Gravatar from 'react-gravatar';

import ILike from '../../interfaces/ILike';
import Spinner from '../shared/Spinner';
import {
  TitleText,
  DangerText,
  CenteredMutedText
} from '../shared/CustomTexts';

import I18n from 'i18n-js';

interface Props {
  likes: Array<ILike>;
  areLoading: boolean;
  error: string;
}

const LikeList = ({ likes, areLoading, error}: Props) => (
  <div className="likeListContainer">
    <TitleText>{I18n.t('javascript.components.post.like_list.who_liked')}</TitleText>
    { areLoading ? <Spinner /> : null }
    { error ? <DangerText>{error}</DangerText> : null }
    <div className="likeList">
      { likes.length === 0 ? <CenteredMutedText>{I18n.t('javascript.components.post.like_list.no_like_yet')}</CenteredMutedText> : null }
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