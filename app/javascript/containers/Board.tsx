import { connect } from 'react-redux';

import { requestPosts } from '../actions/Post/requestPosts';
import { requestPostStatuses } from '../actions/PostStatus/requestPostStatuses';
import {
  setSearchFilter,
  setPostStatusFilter,
} from '../actions/changeFilters';

import { State } from '../reducers/rootReducer';

import BoardP from '../components/Board/BoardP';

const mapStateToProps = (state: State) => ({
  posts: state.posts,
  postStatuses: state.postStatuses,
});

const mapDispatchToProps = (dispatch: any) => ({
  requestPosts(boardId: number, page: number = 1, searchQuery: string = '', postStatusIds: Array<number> = null) {
    dispatch(requestPosts(boardId, page, searchQuery, postStatusIds));
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
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(BoardP);