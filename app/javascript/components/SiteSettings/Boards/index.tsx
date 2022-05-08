import * as React from 'react';
import { Provider } from 'react-redux';
import { Store } from 'redux';
import BoardsSiteSettings from '../../../containers/BoardsSiteSettings';

import createStoreHelper from '../../../helpers/createStore';
import { State } from '../../../reducers/rootReducer';

interface Props {
  authenticityToken: string;
}

class BoardsSiteSettingsRoot extends React.Component<Props> {
  store: Store<State, any>;

  constructor(props: Props) {
    super(props);

    this.store = createStoreHelper();
  }

  render() {
    return (
      <Provider store={this.store}>
        <BoardsSiteSettings
          authenticityToken={this.props.authenticityToken}
        />
      </Provider>
    );
  }
}

export default BoardsSiteSettingsRoot;