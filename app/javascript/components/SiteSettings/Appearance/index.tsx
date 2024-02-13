import * as React from 'react';
import { Provider } from 'react-redux';
import { Store } from 'redux';

import AppearanceSiteSettings from '../../../containers/AppearanceSiteSettings';
import createStoreHelper from '../../../helpers/createStore';
import { State } from '../../../reducers/rootReducer';
import { ISiteSettingsAppearanceForm } from './AppearanceSiteSettingsP';

interface Props {
  originForm: ISiteSettingsAppearanceForm;
  authenticityToken: string;
}

class AppearanceSiteSettingsRoot extends React.Component<Props> {
  store: Store<State, any>;

  constructor(props: Props) {
    super(props);

    this.store = createStoreHelper();
  }

  render() {
    return (
      <Provider store={this.store}>
        <AppearanceSiteSettings
          originForm={this.props.originForm}
          authenticityToken={this.props.authenticityToken}
        />
      </Provider>
    );
  }
}

export default AppearanceSiteSettingsRoot;