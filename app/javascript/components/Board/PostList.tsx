import * as React from 'react';

import InfiniteScroll from 'react-infinite-scroller';

import PostListItem from './PostListItem';
import Spinner from '../shared/Spinner';
import {
  DangerText,
  CenteredMutedText,
} from '../shared/CustomTexts';

import IPost from '../../interfaces/IPost';
import IPostStatus from '../../interfaces/IPostStatus';

interface Props {
  posts: Array<IPost>;
  postStatuses: Array<IPostStatus>;
  areLoading: boolean;
  error: string;

  handleLoadMore(): void;
  hasMore: boolean;
}

const PostList = ({
  posts,
  postStatuses,
  areLoading,
  error,
  handleLoadMore,
  hasMore
}: Props) => (
  <div className="postList">
    { error ? <DangerText>{error}</DangerText> : null }
    <InfiniteScroll
      initialLoad={false}
      loadMore={handleLoadMore}
      threshold={50}
      hasMore={hasMore}
      loader={<Spinner key={0} />}
      useWindow={true}
    >
      {
        posts.length > 0 ?
          posts.map((post, i) => (
            <PostListItem
              id={post.id}
              title={post.title}
              description={post.description}
              postStatus={postStatuses.find(postStatus => postStatus.id === post.postStatusId)}
              commentsCount={post.commentsCount}

              key={i}
            />
          ))
        :
          areLoading ? <p></p> : <CenteredMutedText>There are no posts.</CenteredMutedText>
      }
    </InfiniteScroll>
  </div>
);

export default PostList;