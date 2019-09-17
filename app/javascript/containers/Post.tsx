import { connect } from 'react-redux';

import { requestPost } from '../actions/requestPost';
import { requestComments } from '../actions/requestComments';
import { changePostStatus } from '../actions/changePostStatus';

import { State } from '../reducers/rootReducer';

import PostP from '../components/Post/PostP';

const mapStateToProps = (state: State) => ({
  post: state.currentPost.item,
  comments: state.currentPost.comments,
});

const mapDispatchToProps = (dispatch) => ({
  requestPost(postId: number) {
    dispatch(requestPost(postId));
  },

  requestComments(postId: number, page: number = 1) {
    dispatch(requestComments(postId, page));
  },

  changePostStatus(postId: number, newPostStatusId: number, authenticityToken: string) {
    if (isNaN(newPostStatusId)) newPostStatusId = null;

    dispatch(changePostStatus(postId, newPostStatusId, authenticityToken));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PostP);