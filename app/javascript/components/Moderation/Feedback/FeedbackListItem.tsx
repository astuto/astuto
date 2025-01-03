import React from 'react';
import I18n from 'i18n-js';
import Gravatar from 'react-gravatar';

import IPost, { PostApprovalStatus } from '../../../interfaces/IPost';
import { AnonymousIcon, ApproveIcon, RejectIcon } from '../../common/Icons';
import ReactMarkdown from 'react-markdown';
import ActionLink from '../../common/ActionLink';

interface Props {
  post: IPost;

  onUpdatePostApprovalStatus(
    id: number,
    approvalStatus: PostApprovalStatus,
  ): Promise<any>;

  hideRejectButton: boolean;
}

const FeedbackListItem = ({ post, onUpdatePostApprovalStatus, hideRejectButton }: Props) => {
  return (
    <div className="feedbackListItem">
      <div className="feedbackListItemIconAndContent">
        <div className="feedbackListItemIcon">
          {
            post.userId ?
              <Gravatar email={post.userEmail} size={42} title={post.userEmail} className="avatar userAvatar" />
            :
              <AnonymousIcon size={42} />
          }
        </div>
        
        <div className="feedbackListItemContent">
          <p className="feedbackListItemTitle" onClick={() => window.location.href = `/posts/${post.slug || post.id}`}>
            {post.title}
          </p>

          <ReactMarkdown className="feedbackListItemDescription" allowedTypes={['text']} unwrapDisallowed>
            {post.description.length > 200 ? `${post.description.slice(0, 200)}...` : post.description}
          </ReactMarkdown>
        </div>
      </div>

      <div className="feedbackListItemActions">
        <ActionLink
          onClick={() => {
            onUpdatePostApprovalStatus(post.id, 'approved')
          }}
          icon={<ApproveIcon />}
        >
          {I18n.t('common.buttons.approve')}
        </ActionLink>

        {!hideRejectButton &&
          <ActionLink
            onClick={() => {
              onUpdatePostApprovalStatus(post.id, 'rejected')
            }}
            icon={<RejectIcon />}
          >
            {I18n.t('common.buttons.reject')}
          </ActionLink>
        }
      </div>
    </div>
  );
};

export default FeedbackListItem;