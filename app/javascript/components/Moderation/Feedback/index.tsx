import * as React from 'react';
import { Provider } from 'react-redux';
import { Store } from 'redux';

import FeedbackModeration from '../../../containers/FeedbackModeration';

import createStoreHelper from '../../../helpers/createStore';
import { State } from '../../../reducers/rootReducer';
import { UserRoles } from '../../../interfaces/IUser';
import { TenantSettingFeedbackApprovalPolicy } from '../../../interfaces/ITenantSetting';

interface Props {
  currentUserRole: UserRoles;
  changeFeedbackModerationSettingsUrl: string;
  tenantSettingAllowAnonymousFeedback: boolean;
  tenantSettingFeedbackApprovalPolicy: TenantSettingFeedbackApprovalPolicy;
  authenticityToken: string;
}

class FeedbackModerationRoot extends React.Component<Props> {
  store: Store<State, any>;
  
  constructor(props: Props) {
    super(props);

    this.store = createStoreHelper();
  }

  render() {
    return (
      <Provider store={this.store}>
        <FeedbackModeration
          currentUserRole={this.props.currentUserRole}
          changeFeedbackModerationSettingsUrl={this.props.changeFeedbackModerationSettingsUrl}
          tenantSettingAllowAnonymousFeedback={this.props.tenantSettingAllowAnonymousFeedback}
          tenantSettingFeedbackApprovalPolicy={this.props.tenantSettingFeedbackApprovalPolicy}
          authenticityToken={this.props.authenticityToken}
        />
      </Provider>
    );
  }
}

export default FeedbackModerationRoot;