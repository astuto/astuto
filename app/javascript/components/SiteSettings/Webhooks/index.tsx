import * as React from 'react';
import { Provider } from 'react-redux';
import { Store } from 'redux';

import createStoreHelper from '../../../helpers/createStore';
import { State } from '../../../reducers/rootReducer';
import WebhooksSiteSettings from '../../../containers/WebhooksSiteSettings';

interface Props {
  authenticityToken: string;
}

class WebhooksSiteSettingsRoot extends React.Component<Props> {
  store: Store<State, any>;

  constructor(props: Props) {
    super(props);

    this.store = createStoreHelper();
  }

  render() {
    return (
      <Provider store={this.store}>
        <WebhooksSiteSettings
          authenticityToken={this.props.authenticityToken}
        />
      </Provider>
    );
  }
}

export default WebhooksSiteSettingsRoot;