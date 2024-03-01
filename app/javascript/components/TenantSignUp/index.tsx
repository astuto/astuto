import * as React from 'react';
import { Provider } from 'react-redux';
import { Store } from 'redux';

import createStoreHelper from '../../helpers/createStore';
import TenantSignUp from '../../containers/TenantSignUp';
import { State } from '../../reducers/rootReducer';
import { IOAuthJSON, oAuthJSON2JS } from '../../interfaces/IOAuth';

interface Props {
  oAuths: Array<IOAuthJSON>;
  oAuthLoginCompleted: boolean;
  oauthUserEmail?: string;
  oauthUserName?: string;
  baseUrl: string;
  astutoLogoImage: string;
  pendingTenantImage: string;
  authenticityToken: string;
}

class TenantSignUpRoot extends React.Component<Props> {
  store: Store<State, any>;

  constructor(props: Props) {
    super(props);

    this.store = createStoreHelper();
  }

  render() {
    const {
      oAuths,
      oAuthLoginCompleted,
      oauthUserEmail,
      oauthUserName,
      astutoLogoImage,
      pendingTenantImage,
      baseUrl,
      authenticityToken,
    } = this.props;

    return (
      <Provider store={this.store}>
        <TenantSignUp
          oAuthLoginCompleted={oAuthLoginCompleted}
          oauthUserEmail={oauthUserEmail}
          oauthUserName={oauthUserName}
          oAuths={oAuths.map(oAuth => oAuthJSON2JS(oAuth))}
          astutoLogoImage={astutoLogoImage}
          pendingTenantImage={pendingTenantImage}
          baseUrl={baseUrl}
          authenticityToken={authenticityToken}
        />
      </Provider>
    );
  }
}

export default TenantSignUpRoot;