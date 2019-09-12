import { connect } from 'react-redux';

import { requestPost } from '../actions/requestPost';
import { changePostStatus } from '../actions/changePostStatus';

import { State } from '../reducers/rootReducer';

import PostP from '../components/Post/PostP';

const mapStateToProps = (state: State) => ({
  post: state.currentPost,
});

const mapDispatchToProps = (dispatch) => ({
  requestPost(postId: number) {
    dispatch(requestPost(postId));
  },

  changePostStatus(postId: number, newPostStatusId: number, authenticityToken: string) {
    dispatch(changePostStatus(postId, newPostStatusId, authenticityToken));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PostP);