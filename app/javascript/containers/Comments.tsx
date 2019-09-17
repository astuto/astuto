import { connect } from 'react-redux';

import { requestComments } from '../actions/requestComments';

import { State } from '../reducers/rootReducer';

import CommentsP from '../components/Comments/CommentsP';

const mapStateToProps = (state: State) => ({
  comments: state.currentPost.comments.items,
  areLoading: state.currentPost.comments.areLoading,
  error: state.currentPost.comments.error,
  page: state.currentPost.comments.page,
  haveMore: state.currentPost.comments.haveMore,
});

const mapDispatchToProps = (dispatch) => ({
  requestComments(postId: number, page: number = 1) {
    dispatch(requestComments(postId, page));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CommentsP);