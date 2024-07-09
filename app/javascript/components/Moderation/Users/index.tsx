import * as React from 'react';
import { Provider } from 'react-redux';
import { Store } from 'redux';

import UsersSiteSettings from '../../../containers/UsersModeration';

import createStoreHelper from '../../../helpers/createStore';
import { UserRoles } from '../../../interfaces/IUser';
import { State } from '../../../reducers/rootReducer';

interface Props {
  currentUserEmail: string;
  currentUserRole: UserRoles;
  authenticityToken: string;
}

class UsersSiteSettingsRoot extends React.Component<Props> {
  store: Store<State, any>;
  
  constructor(props: Props) {
    super(props);

    this.store = createStoreHelper();
  }

  render() {
    return (
      <Provider store={this.store}>
        <UsersSiteSettings
          currentUserEmail={this.props.currentUserEmail}
          currentUserRole={this.props.currentUserRole}
          authenticityToken={this.props.authenticityToken}
        />
      </Provider>
    );
  }
}

export default UsersSiteSettingsRoot;