import * as React from 'react';
import I18n from 'i18n-js';

import Box from '../../common/Box';
import SiteSettingsInfoBox from '../../common/SiteSettingsInfoBox';

import HttpStatus from '../../../constants/http_status';
import Spinner from '../../common/Spinner';
import { UserRoles } from '../../../interfaces/IUser';
import { TenantSettingFeedbackApprovalPolicy } from '../../../interfaces/ITenantSetting';
import Badge from '../../common/Badge';
import ActionLink from '../../common/ActionLink';
import { SettingsIcon } from '../../common/Icons';

interface Props {
  currentUserRole: UserRoles;
  changeFeedbackModerationSettingsUrl: string;
  tenantSettingAllowAnonymousFeedback: boolean;
  tenantSettingFeedbackApprovalPolicy: TenantSettingFeedbackApprovalPolicy;
  authenticityToken: string;
}

class FeedbackModerationP extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
  }

  componentDidMount() {
    // TODO
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
    } = this.props;

    return (
      <>
        <Box customClass="feedbackModerationContainer">
          <h2>{ I18n.t('moderation.menu.feedback') }</h2>

          {
            (currentUserRole === 'admin' || currentUserRole === 'owner') &&
              <>
              <div className="badges">
                <Badge>
                  {
                    tenantSettingAllowAnonymousFeedback ?
                      I18n.t('moderation.feedback.anonymous_feedback_allowed')
                    :
                      I18n.t('moderation.feedback.anonymous_feedback_not_allowed')
                  }
                </Badge>
                
                <Badge>
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
        </Box>

        <SiteSettingsInfoBox areUpdating={true} error={'TODO'} />
      </>
    );
  }
}

export default FeedbackModerationP;