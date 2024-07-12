import * as React from 'react';
import I18n from 'i18n-js';

import Box from '../../common/Box';
import SiteSettingsInfoBox from '../../common/SiteSettingsInfoBox';
import { UserRoles } from '../../../interfaces/IUser';
import { TenantSettingFeedbackApprovalPolicy } from '../../../interfaces/ITenantSetting';
import Badge, { BADGE_TYPE_LIGHT } from '../../common/Badge';
import ActionLink from '../../common/ActionLink';
import { SettingsIcon } from '../../common/Icons';
import IPost, { PostApprovalStatus } from '../../../interfaces/IPost';
import FeedbackModerationList from './FeedbackModerationList';

interface Props {
  currentUserRole: UserRoles;
  changeFeedbackModerationSettingsUrl: string;
  tenantSettingAllowAnonymousFeedback: boolean;
  tenantSettingFeedbackApprovalPolicy: TenantSettingFeedbackApprovalPolicy;
  authenticityToken: string;

  posts: Array<IPost>;
  areLoading: boolean;
  areUpdating: boolean;
  error: string;
  requestPostsForModeration(): void;
  updatePostApprovalStatus(
    id: number,
    approvalStatus: PostApprovalStatus,
    authenticityToken: string
  ): Promise<any>;
}

interface State {
  filter: 'pending' | 'rejected';
}

class FeedbackModerationP extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      filter: 'pending',
    };
  }

  componentDidMount() {
    this.props.requestPostsForModeration();
  }

  getFeedbackPolicyString(tenantSettingFeedbackApprovalPolicy: TenantSettingFeedbackApprovalPolicy): string {
    switch (tenantSettingFeedbackApprovalPolicy) {
      case 'anonymous_require_approval':
        return I18n.t('site_settings.general.feedback_approval_policy_anonymous_require_approval');
      case 'never_require_approval':
        return I18n.t('site_settings.general.feedback_approval_policy_never_require_approval');
      case 'always_require_approval':
        return I18n.t('site_settings.general.feedback_approval_policy_always_require_approval');
    }
  }

  render() {
    const {
      currentUserRole,
      changeFeedbackModerationSettingsUrl,
      tenantSettingAllowAnonymousFeedback,
      tenantSettingFeedbackApprovalPolicy,

      posts,
      areLoading,
      areUpdating,
      error,

      updatePostApprovalStatus,

      authenticityToken,
    } = this.props;

    const { filter } = this.state;

    const pendingPosts = posts.filter(post => post.approvalStatus === 'pending');
    const rejectedPosts = posts.filter(post => post.approvalStatus === 'rejected');

    return (
      <>
        <Box customClass="feedbackModerationContainer">
          <h2>{ I18n.t('moderation.menu.feedback') }</h2>

          {
            (currentUserRole === 'admin' || currentUserRole === 'owner') &&
              <>
              <div className="badges">
                <Badge type={BADGE_TYPE_LIGHT}>
                  {
                    tenantSettingAllowAnonymousFeedback ?
                      I18n.t('moderation.feedback.anonymous_feedback_allowed')
                    :
                      I18n.t('moderation.feedback.anonymous_feedback_not_allowed')
                  }
                </Badge>
                
                <Badge type={BADGE_TYPE_LIGHT}>
                  { this.getFeedbackPolicyString(tenantSettingFeedbackApprovalPolicy) }
                </Badge>
              </div>

              <ActionLink
                onClick={() => window.location.href = changeFeedbackModerationSettingsUrl} icon={<SettingsIcon />}
                customClass="changeFeedbackModerationSettingsLink"
              >
                { I18n.t('moderation.feedback.change_feedback_moderation_settings') }
              </ActionLink>
              </>
          }

          <ul className="filterModerationFeedbackNav">
            <li className="nav-item">
              <a onClick={() => this.setState({filter: 'pending'})} className={`nav-link${filter === 'pending' ? ' active' : ''}`}>
                {I18n.t('activerecord.attributes.post.approval_status_pending')}
                &nbsp;
                ({pendingPosts && pendingPosts.length})
              </a>
            </li>
            <li className="nav-item">
              <a onClick={() => this.setState({filter: 'rejected'})} className={`nav-link${filter === 'rejected' ? ' active' : ''}`}>
                {I18n.t('activerecord.attributes.post.approval_status_rejected')}
              </a>
            </li>
          </ul>

          {
            filter === 'pending' ?
              <FeedbackModerationList
                posts={pendingPosts}
                onUpdatePostApprovalStatus={
                  (id: number, approvalStatus: PostApprovalStatus) =>
                    updatePostApprovalStatus(id, approvalStatus, authenticityToken)
                }
              />
            :
              <FeedbackModerationList
                posts={rejectedPosts}
                onUpdatePostApprovalStatus={
                  (id: number, approvalStatus: PostApprovalStatus) =>
                    updatePostApprovalStatus(id, approvalStatus, authenticityToken)
                }
                hideRejectButton
              />
          }
        </Box>

        <SiteSettingsInfoBox areUpdating={areLoading || areUpdating} error={error} />
      </>
    );
  }
}

export default FeedbackModerationP;