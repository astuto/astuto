import * as React from 'react';

import NewPost from './NewPost';
import PostList from './PostList';

import IBoard from '../../interfaces/IBoard';

import '../../stylesheets/components/Board/Board.scss';

interface Props {
  board: IBoard;
  isLoggedIn: boolean;
  authenticityToken: string;
}

class Board extends React.Component<Props> {
  render() {
    const { board, isLoggedIn, authenticityToken } = this.props;

    return (
      <div className="boardContainer">
        <div className="sidebar">
          <NewPost board={board} isLoggedIn={isLoggedIn} authenticityToken={authenticityToken} />
        </div>
        <PostList board={board} />
      </div>
    );
  }
}

export default Board;