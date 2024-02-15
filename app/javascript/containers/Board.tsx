import { connect } from 'react-redux';

import { requestPosts } from '../actions/Post/requestPosts';
import { requestPostStatuses } from '../actions/PostStatus/requestPostStatuses';
import {
  setSearchFilter,
  setPostStatusFilter,
  SortByFilterValues,
  setSortByFilter,
  setDateFilter,
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
    date: { startDate: string; endDate: string } = { startDate: '', endDate: '' }
  ) {
    dispatch(requestPosts(boardId, page, searchQuery, postStatusIds, sortBy, date));
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
  },

  handleDateFilterChange(startDate: string, endDate: string) {
    dispatch(setDateFilter(startDate, endDate));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(BoardP);