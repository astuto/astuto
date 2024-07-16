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
  currentUserFullName: string;
  tenantSetting: ITenantSetting;
  componentRenderedAt: number;
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
      currentUserFullName,
      tenantSetting,
      componentRenderedAt,
      authenticityToken,
    } = this.props;

    return (
      <Provider store={this.store}>
        <Board
          board={board}
          isLoggedIn={isLoggedIn}
          isPowerUser={isPowerUser}
          currentUserFullName={currentUserFullName}
          tenantSetting={tenantSetting}
          componentRenderedAt={componentRenderedAt}
          authenticityToken={authenticityToken}
        />
      </Provider>
    );
  }
}

export default BoardRoot;