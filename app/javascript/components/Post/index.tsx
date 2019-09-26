import * as React from 'react';
import { Provider } from 'react-redux';

import createStoreHelper from '../../helpers/createStore';

import Post from '../../containers/Post';

import IBoard from '../../interfaces/IBoard';
import IPostStatus from '../../interfaces/IPostStatus';

interface Props {
  postId: number;
  boards: Array<IBoard>;
  postStatuses: Array<IPostStatus>;
  isLoggedIn: boolean;
  isPowerUser: boolean;
  authenticityToken: string;
}

class PostRoot extends React.Component<Props> {
  store: any;

  constructor(props: Props) {
    super(props);

    this.store = createStoreHelper();
  }

  render() {
    const {
      postId,
      boards,
      postStatuses,
      isLoggedIn,
      isPowerUser,
      authenticityToken
    } = this.props;

    return (
      <Provider store={this.store}>
        <Post
          postId={postId}
          boards={boards}
          postStatuses={postStatuses}

          isLoggedIn={isLoggedIn}
          isPowerUser={isPowerUser}
          authenticityToken={authenticityToken}
        />
      </Provider>
    );
  }
}

export default PostRoot;