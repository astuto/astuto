import * as React from 'react';
import { Provider } from 'react-redux';

import createStoreHelper from '../../helpers/createStore';

import Post from '../../containers/Post';

import IBoard from '../../interfaces/IBoard';
import IPostStatus from '../../interfaces/IPostStatus';

import { Store } from 'redux';
import { State } from '../../reducers/rootReducer';

interface Props {
  postId: number;
  boards: Array<IBoard>;
  postStatuses: Array<IPostStatus>;
  isLoggedIn: boolean;
  isPowerUser: boolean;
  userFullName: string;
  userEmail: string;
  authenticityToken: string;
}

class PostRoot extends React.Component<Props> {
  store: Store<State, any>;

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
      userFullName,
      userEmail,
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
          userFullName={userFullName}
          userEmail={userEmail}
          authenticityToken={authenticityToken}
        />
      </Provider>
    );
  }
}

export default PostRoot;