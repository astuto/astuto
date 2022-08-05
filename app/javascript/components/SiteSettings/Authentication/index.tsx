import * as React from 'react';
import { Provider } from 'react-redux';
import { Store } from 'redux';

import AuthenticationSiteSettings from '../../../containers/AuthenticationSiteSettings';
import createStoreHelper from '../../../helpers/createStore';
import { State } from '../../../reducers/rootReducer';

interface Props {
  authenticityToken: string;
}

class AuthenticationSiteSettingsRoot extends React.Component<Props> {
  store: Store<State, any>;

  constructor(props: Props) {
    super(props);

    this.store = createStoreHelper();
  }

  render() {
    return (
      <Provider store={this.store}>
        <AuthenticationSiteSettings
          authenticityToken={this.props.authenticityToken}
        />
      </Provider>
    );
  }
}

export default AuthenticationSiteSettingsRoot;