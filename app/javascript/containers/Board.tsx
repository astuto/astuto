import { connect } from 'react-redux';

import { requestPosts } from '../actions/Post/requestPosts';
import { requestPostStatuses } from '../actions/PostStatus/requestPostStatuses';
import {
  setSearchFilter,
  setPostStatusFilter,
  SortByFilterValues,
  setSortByFilter,
} from '../actions/changeFilters';

import { State } from '../reducers/rootReducer';

import BoardP from '../components/Board/BoardP';

const mapStateToProps = (state: State) => ({
  posts: state.posts,
  postStatuses: state.postStatuses,
});

const mapDispatchToProps = (dispatch: any) => ({
  requestPosts(
    boardId: number,
    page: number = 1,
    searchQuery: string = '',
    postStatusIds: Array<number> = null,
    sortBy: SortByFilterValues = null,
  ) {
    dispatch(requestPosts(boardId, page, searchQuery, postStatusIds, sortBy));
  },

  requestPostStatuses() {
    dispatch(requestPostStatuses());
  },

  handleSearchFilterChange(searchQuery: string) {
    dispatch(setSearchFilter(searchQuery));
  },

  handlePostStatusFilterChange(postStatusId: number) {
    dispatch(setPostStatusFilter(postStatusId));
  },

  handleSortByFilterChange(sortBy: SortByFilterValues) {
    dispatch(setSortByFilter(sortBy));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(BoardP);