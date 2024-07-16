import React from 'react';
import I18n from 'i18n-js';

import IPost, { PostApprovalStatus } from '../../../interfaces/IPost';
import FeedbackListItem from './FeedbackListItem';
import { MutedText } from '../../common/CustomTexts';

interface Props {
  posts: Array<IPost>;
  
  onUpdatePostApprovalStatus(
    id: number,
    approvalStatus: PostApprovalStatus,
  ): Promise<any>;

  hideRejectButton?: boolean;
}

const FeedbackModerationList = ({ posts, onUpdatePostApprovalStatus, hideRejectButton = false }: Props) => {
  return (
    <div className="feedbackModerationList">
      {
        (posts && posts.length > 0) ?
          posts.map((post, i) => (
            <FeedbackListItem
              key={i}
              post={post}
              onUpdatePostApprovalStatus={onUpdatePostApprovalStatus}
              hideRejectButton={hideRejectButton}
            />
          ))
        :
          <div className="emptyList">
            <MutedText>{I18n.t('board.posts_list.empty')}</MutedText>
          </div>
      }
    </div>
  );
};

export default FeedbackModerationList;