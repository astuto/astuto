import { connect } from 'react-redux';

import { requestPost } from '../actions/Post/requestPost';
import { requestLikes } from '../actions/Like/requestLikes';
import { changePostBoard } from '../actions/Post/changePostBoard';
import { changePostStatus } from '../actions/Post/changePostStatus';

import { State } from '../reducers/rootReducer';

import PostP from '../components/Post/PostP';

const mapStateToProps = (state: State) => ({
  post: state.currentPost.item,
  likes: state.currentPost.likes,
  comments: state.currentPost.comments,
});

const mapDispatchToProps = (dispatch) => ({
  requestPost(postId: number) {
    dispatch(requestPost(postId));
  },

  requestLikes(postId: number) {
    dispatch(requestLikes(postId));
  },

  changePostBoard(postId: number, newBoardId: number, authenticityToken: string) {
    dispatch(changePostBoard(postId, newBoardId, authenticityToken));
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