import * as React from 'react';
import { Provider } from 'react-redux';

import Board from '../../containers/Board';
import createStoreHelper from '../../helpers/createStore';

import IBoard from '../../interfaces/IBoard';

import { Store } from 'redux';
import { State } from '../../reducers/rootReducer';
import ITenantSetting from '../../interfaces/ITenantSetting';

interface Props {
  board: IBoard;
  isLoggedIn: boolean;
  isPowerUser: boolean;
  tenantSetting: ITenantSetting;
  authenticityToken: string;
}

class BoardRoot extends React.Component<Props> {
  store: Store<State, any>;

  constructor(props: Props) {
    super(props);

    this.store = createStoreHelper();
  }

  render() {
    const {
      board,
      isLoggedIn,
      isPowerUser,
      tenantSetting,
      authenticityToken,
    } = this.props;

    return (
      <Provider store={this.store}>
        <Board
          board={board}
          isLoggedIn={isLoggedIn}
          isPowerUser={isPowerUser}
          tenantSetting={tenantSetting}
          authenticityToken={authenticityToken}
        />
      </Provider>
    );
  }
}

export default BoardRoot;