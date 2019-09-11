import * as React from 'react';
import { Provider } from 'react-redux';

import store from '../../stores';

import Board from '../../containers/Board';

import '../../stylesheets/components/Board.scss';

const BoardRoot = ({ board, isLoggedIn, authenticityToken }) => (
  <Provider store={store}>
    <Board
      board={board}
      isLoggedIn={isLoggedIn}
      authenticityToken={authenticityToken}
    />
  </Provider>
);

export default BoardRoot;