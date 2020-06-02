import * as React from 'react';
import Gravatar from 'react-gravatar';

import { TitleText, DangerText, CenteredMutedText, MutedText } from '../shared/CustomTexts';
import Spinner from '../shared/Spinner';

import IComment from '../../interfaces/IComment';

import friendlyDate from '../../helpers/friendlyDate';

import I18n from 'i18n-js';

interface Props {
  postUpdates: Array<IComment>;
  areLoading: boolean;
  error: string;
}

const PostUpdateList = ({
  postUpdates,
  areLoading,
  error,
}: Props) => (
  <div className="postUpdateListContainer">
    <TitleText>{I18n.t('javascript.components.post.post_update_list.post_updates')}</TitleText>
    { areLoading ? <Spinner /> : null }
    { error ? <DangerText>{error}</DangerText> : null }
    <div className="postUpdateList">
      { postUpdates.length === 0 ? <CenteredMutedText>{I18n.t('javascript.components.post.post_update_list.no_post_update')}</CenteredMutedText> : null }
      {
        postUpdates.map((postUpdate, i) => (
          <div className="postUpdateListItem" key={i}>
            <div className="postUpdateListItemHeader">
              <Gravatar email={postUpdate.userEmail} size={28} className="gravatar" />
              <span>{postUpdate.userFullName}</span>
            </div>

            <p className="postUpdateListItemBody">{postUpdate.body}</p>

            <MutedText>{friendlyDate(postUpdate.updatedAt)}</MutedText>
          </div>
        ))
      }
    </div>
  </div>
);

export default PostUpdateList;