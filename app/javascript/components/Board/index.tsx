import * as React from 'react';
import { Provider } from 'react-redux';

import Board from '../../containers/Board';
import createStoreHelper from '../../helpers/createStore';

import '../../stylesheets/components/Board.scss';

import IBoard from '../../interfaces/IBoard';

interface Props {
  board: IBoard;
  isLoggedIn: boolean;
  authenticityToken: string;
}

class BoardRoot extends React.Component<Props> {
  store: any;

  constructor(props) {
    super(props);

    this.store = createStoreHelper();
  }

  render() {
    const { board, isLoggedIn, authenticityToken } = this.props;

    return (
      <Provider store={this.store}>
        <Board
          board={board}
          isLoggedIn={isLoggedIn}
          authenticityToken={authenticityToken}
        />
      </Provider>
    );
  }
}

export default BoardRoot;