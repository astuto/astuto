import * as React from 'react';
import I18n from 'i18n-js';
import Gravatar from 'react-gravatar';

import { BoxTitleText, DangerText, CenteredMutedText, MutedText } from '../shared/CustomTexts';
import Spinner from '../shared/Spinner';

import IComment from '../../interfaces/IComment';
import IPostStatusChange from '../../interfaces/IPostStatusChange';
import IPostStatus from '../../interfaces/IPostStatus';

import friendlyDate from '../../helpers/datetime';
import PostStatusLabel from '../shared/PostStatusLabel';

interface Props {
  postUpdates: Array<IComment | IPostStatusChange>;
  postStatuses: Array<IPostStatus>
  areLoading: boolean;
  error: string;
}

const PostUpdateList = ({
  postUpdates,
  postStatuses,
  areLoading,
  error,
}: Props) => (
  <div className="postUpdateListContainer">
    <BoxTitleText>{I18n.t('post.updates_box.title')}</BoxTitleText>

    { areLoading ? <Spinner /> : null }
    { error ? <DangerText>{error}</DangerText> : null }

    <div className="postUpdateList">
      {
        postUpdates.length === 0 ?
          <CenteredMutedText>{I18n.t('post.updates_box.empty')}</CenteredMutedText>
        :
          null
      }
      {
        postUpdates.map((postUpdate, i) => (
          <div className="postUpdateListItem" key={i}>
            <div className="postUpdateListItemHeader">
              <Gravatar email={postUpdate.userEmail} size={28} className="gravatar" />
              <span>{postUpdate.userFullName}</span>
            </div>

            <p className="postUpdateListItemBody">
              { 'body' in postUpdate ?
                  postUpdate.body
                :
                  <React.Fragment>
                    <i>{I18n.t('post.updates_box.status_change')}</i>&nbsp;
                    <PostStatusLabel
                      {...postStatuses.find(postStatus => postStatus.id === postUpdate.postStatusId)}
                    />
                  </React.Fragment>  
              }
            </p>

            <MutedText>{friendlyDate(postUpdate.updatedAt)}</MutedText>
          </div>
        ))
      }
    </div>
  </div>
);

export default PostUpdateList;