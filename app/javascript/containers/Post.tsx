import { connect } from 'react-redux';

import { requestPost } from '../actions/Post/requestPost';
import { requestLikes } from '../actions/Like/requestLikes';
import { changePostBoard } from '../actions/Post/changePostBoard';
import { changePostStatus } from '../actions/Post/changePostStatus';
import { submitFollow } from '../actions/Follow/submitFollow';
import { requestFollow } from '../actions/Follow/requestFollow';
import { requestPostStatusChanges } from '../actions/PostStatusChange/requestPostStatusChanges';

import { State } from '../reducers/rootReducer';

import PostP from '../components/Post/PostP';

const mapStateToProps = (state: State) => ({
  post: state.currentPost.item,
  likes: state.currentPost.likes,
  followed: state.currentPost.followed,
  comments: state.currentPost.comments,
  postStatusChanges: state.currentPost.postStatusChanges,
});

const mapDispatchToProps = (dispatch) => ({
  requestPost(postId: number) {
    dispatch(requestPost(postId));
  },

  requestLikes(postId: number) {
    dispatch(requestLikes(postId));
  },

  requestFollow(postId: number) {
    dispatch(requestFollow(postId));
  },

  requestPostStatusChanges(postId: number) {
    dispatch(requestPostStatusChanges(postId));
  },

  changePostBoard(postId: number, newBoardId: number, authenticityToken: string) {
    dispatch(changePostBoard(postId, newBoardId, authenticityToken));
  },

  changePostStatus(postId: number, newPostStatusId: number, authenticityToken: string) {
    if (isNaN(newPostStatusId)) newPostStatusId = null;

    dispatch(changePostStatus(postId, newPostStatusId, authenticityToken));
  },

  submitFollow(postId: number, isFollow: boolean, authenticityToken: string) {
    dispatch(submitFollow(postId, isFollow, authenticityToken));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PostP);