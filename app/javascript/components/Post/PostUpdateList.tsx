import * as React from 'react';
import Gravatar from 'react-gravatar';

import { TitleText, DangerText, CenteredMutedText, MutedText } from '../shared/CustomTexts';
import Spinner from '../shared/Spinner';

import IComment from '../../interfaces/IComment';

import friendlyDate from '../../helpers/friendlyDate';

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
    <TitleText>Post updates</TitleText>
    { areLoading ? <Spinner /> : null }
    { error ? <DangerText>{error}</DangerText> : null }
    <div className="postUpdateList">
      { postUpdates.length === 0 ? <CenteredMutedText>There are no post updates yet.</CenteredMutedText> : null }
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