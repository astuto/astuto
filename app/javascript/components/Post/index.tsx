import * as React from 'react';
import { Provider } from 'react-redux';

import store from '../../stores';

import Post from '../../containers/Post';

import '../../stylesheets/components/Post.scss';

const PostRoot = ({ postId, postStatuses, isLoggedIn, isPowerUser, authenticityToken }) => (
  <Provider store={store}>
    <Post
      postId={postId}
      postStatuses={postStatuses}

      isLoggedIn={isLoggedIn}
      isPowerUser={isPowerUser}
      authenticityToken={authenticityToken}
    />
  </Provider>
);

export default PostRoot;