import * as React from 'react';

import NewPost from './NewPost';
import SearchFilter from './SearchFilter';
import PostStatusFilter from './PostStatusFilter';
import PostList from './PostList';
import Sidebar from '../common/Sidebar';

import IBoard from '../../interfaces/IBoard';
import ITenantSetting from '../../interfaces/ITenantSetting';

import { PostsState } from '../../reducers/postsReducer';
import { PostStatusesState } from '../../reducers/postStatusesReducer';
import SortByFilter from './SortByFilter';
import { SortByFilterValues } from '../../actions/changeFilters';

interface Props {
  board: IBoard;
  isLoggedIn: boolean;
  isPowerUser: boolean;
  tenantSetting: ITenantSetting;
  authenticityToken: string;
  posts: PostsState;
  postStatuses: PostStatusesState;

  requestPosts(
    boardId: number,
    page?: number,
    searchQuery?: string,
    postStatusIds?: Array<number>,
    sortBy?: SortByFilterValues,
  ): void;
  requestPostStatuses(): void;
  handleSearchFilterChange(searchQuery: string): void;
  handlePostStatusFilterChange(postStatusId: number): void;
  handleSortByFilterChange(sortBy: SortByFilterValues): void;
}

class BoardP extends React.Component<Props> {
  searchFilterTimeoutId: ReturnType<typeof setTimeout>;

  componentDidMount() {
    this.props.requestPosts(this.props.board.id, 1, '', null, this.props.posts.filters.sortBy);
    this.props.requestPostStatuses();
  }

  componentDidUpdate(prevProps: Props) {
    const { searchQuery } = this.props.posts.filters;
    const prevSearchQuery = prevProps.posts.filters.searchQuery;

    const { postStatusIds } = this.props.posts.filters;
    const prevPostStatusIds = prevProps.posts.filters.postStatusIds;

    const { sortBy } = this.props.posts.filters;
    const prevSortBy = prevProps.posts.filters.sortBy;

    // search filter changed
    if (searchQuery !== prevSearchQuery) {
      if (this.searchFilterTimeoutId) clearInterval(this.searchFilterTimeoutId);

      this.searchFilterTimeoutId = setTimeout(() => (
        this.props.requestPosts(this.props.board.id, 1, searchQuery, postStatusIds)
      ), 500);
    }

    // post status filter changed
    if (postStatusIds.length !== prevPostStatusIds.length) {
      this.props.requestPosts(this.props.board.id, 1, searchQuery, postStatusIds);
    }

    // sort by filter changed
    if (sortBy !== prevSortBy) {
      this.props.requestPosts(this.props.board.id, 1, searchQuery, postStatusIds, sortBy);
    }
  }

  render() {
    const {
      board,
      isLoggedIn,
      isPowerUser,
      tenantSetting,
      authenticityToken,
      posts,
      postStatuses,

      requestPosts,
      handleSearchFilterChange,
      handlePostStatusFilterChange,
      handleSortByFilterChange,
    } = this.props;
    const { filters } = posts;

    return (
      <div className="boardContainer">
        <Sidebar>
          <NewPost
            board={board}
            isLoggedIn={isLoggedIn}
            authenticityToken={authenticityToken}
          />
          <SearchFilter
            searchQuery={filters.searchQuery}
            handleChange={handleSearchFilterChange}
          />
          {
            isPowerUser &&
            <SortByFilter
              sortBy={filters.sortBy}
              handleChange={sortBy => handleSortByFilterChange(sortBy)}
            />
          }
          <PostStatusFilter
            postStatuses={postStatuses.items}
            areLoading={postStatuses.areLoading}
            error={postStatuses.error}

            currentFilter={filters.postStatusIds}
            handleFilterClick={handlePostStatusFilterChange}
          />
        </Sidebar>

        <PostList
          posts={posts.items}
          showLikeCount={isPowerUser || tenantSetting.show_vote_count}
          showLikeButtons={tenantSetting.show_vote_button_in_board}
          postStatuses={postStatuses.items}
          areLoading={posts.areLoading}
          error={posts.error}
          
          hasMore={posts.haveMore}
          handleLoadMore={() =>
            posts.areLoading ?
              null
            :
              requestPosts(board.id, posts.page + 1, filters.searchQuery, filters.postStatusIds)
          }

          isLoggedIn={isLoggedIn}
          authenticityToken={authenticityToken}
        />
      </div>
    );
  }
}

export default BoardP;