import * as React from 'react';

import NewPost from './NewPost';
import SearchFilter from './SearchFilter';
import PostStatusFilter from './PostStatusFilter';
import PostList from './PostList';

import IBoard from '../../interfaces/IBoard';
import IPost from '../../interfaces/IPost';

import { PostsState } from '../../reducers/postsReducer';
import { PostStatusesState } from '../../reducers/postStatusesReducer';

interface Props {
  board: IBoard;
  isLoggedIn: boolean;
  authenticityToken: string;
  posts: PostsState;
  postStatuses: PostStatusesState;

  requestPosts(
    boardId: number,
    page?: number,
    searchQuery?: string,
    postStatusId?: number,
  ): void;
  requestPostStatuses(): void;
  handleSearchFilterChange(searchQuery: string): void;
  handlePostStatusFilterChange(postStatusId: number): void;
}

class BoardP extends React.Component<Props> {
  searchFilterTimeoutId: ReturnType<typeof setTimeout>;

  componentDidMount() {
    this.props.requestPosts(this.props.board.id);
    this.props.requestPostStatuses();
  }

  componentDidUpdate(prevProps) {
    const { searchQuery } = this.props.posts.filters;
    const prevSearchQuery = prevProps.posts.filters.searchQuery;

    const { postStatusId } = this.props.posts.filters;
    const prevPostStatusId = prevProps.posts.filters.postStatusId;

    // search filter changed
    if (searchQuery !== prevSearchQuery) {
      if (this.searchFilterTimeoutId) clearInterval(this.searchFilterTimeoutId);

      this.searchFilterTimeoutId = setTimeout(() => (
        this.props.requestPosts(this.props.board.id, 1, searchQuery, postStatusId)
      ), 500);
    }

    // post status filter changed
    if (postStatusId !== prevPostStatusId) {
      this.props.requestPosts(this.props.board.id, 1, searchQuery, postStatusId);
    }
  }

  render() {
    const {
      board,
      isLoggedIn,
      authenticityToken,
      posts,
      postStatuses,

      requestPosts,
      handleSearchFilterChange,
      handlePostStatusFilterChange,
    } = this.props;

    return (
      <div className="boardContainer">
        <div className="sidebar">
          <NewPost
            board={board}
            isLoggedIn={isLoggedIn}
            authenticityToken={authenticityToken}
          />
          <SearchFilter
            searchQuery={posts.filters.searchQuery}
            handleChange={handleSearchFilterChange}
          />
          <PostStatusFilter
            postStatuses={postStatuses.items}
            areLoading={postStatuses.areLoading}
            error={postStatuses.error}

            currentFilter={posts.filters.postStatusId}
            handleFilterClick={handlePostStatusFilterChange}
          />
        </div>

        <PostList
          posts={posts.items}
          postStatuses={postStatuses.items}
          page={posts.page}
          hasMore={posts.haveMore}
          areLoading={posts.areLoading}
          error={posts.error}

          handleLoadMore={() => posts.areLoading ? null : requestPosts(board.id, posts.page + 1)}
        />
      </div>
    );
  }
}

export default BoardP;