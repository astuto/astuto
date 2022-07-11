import * as React from 'react';
import { Provider } from 'react-redux';

import createStoreHelper from '../../helpers/createStore';

import TenantSignUp from '../../containers/TenantSignUp';

import { Store } from 'redux';
import { State } from '../../reducers/rootReducer';

interface Props {
  authenticityToken: string;
}

class TenantSignUpRoot extends React.Component<Props> {
  store: Store<State, any>;

  constructor(props: Props) {
    super(props);

    this.store = createStoreHelper();
  }

  render() {
    const { authenticityToken } = this.props;

    return (
      <Provider store={this.store}>
        <TenantSignUp
          authenticityToken={authenticityToken}
        />
      </Provider>
    );
  }
}

export default TenantSignUpRoot;