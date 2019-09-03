import * as React from 'react';

import PostListItem from './PostListItem';
import Spinner from '../shared/Spinner';

import IPost from '../../interfaces/IPost';

interface Props {
  posts: Array<IPost>;
  areLoading: boolean;
  error: string;
}

const PostList = ({ posts, areLoading, error }: Props) => (
  <div className="box postList">
    { areLoading ? <Spinner /> : null }
    { error ? <span className="error">{error}</span> : null }
    {
      posts.map((post, i) => (
        <PostListItem
          title={post.title}
          description={post.description}
          postStatus={post.postStatus}

          key={i}
        />
      ))
    }
  </div>
);

export default PostList;