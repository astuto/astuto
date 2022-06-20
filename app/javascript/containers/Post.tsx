import { connect } from 'react-redux';

import { requestPost } from '../actions/Post/requestPost';
import { requestLikes } from '../actions/Like/requestLikes';
import { changePostBoard } from '../actions/Post/changePostBoard';
import { changePostStatus } from '../actions/Post/changePostStatus';
import { submitFollow } from '../actions/Follow/submitFollow';
import { requestFollow } from '../actions/Follow/requestFollow';
import { requestPostStatusChanges } from '../actions/PostStatusChange/requestPostStatusChanges';
import { postStatusChangeSubmitted } from '../actions/PostStatusChange/submittedPostStatusChange';

import { State } from '../reducers/rootReducer';

import PostP from '../components/Post/PostP';

import { fromJavascriptDateToRailsString } from '../helpers/datetime';
import { deletePost } from '../actions/Post/deletePost';

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

  deletePost(postId: number, authenticityToken: string) {
    return dispatch(deletePost(postId, authenticityToken));
  },

  changePostBoard(postId: number, newBoardId: number, authenticityToken: string) {
    dispatch(changePostBoard(postId, newBoardId, authenticityToken));
  },

  changePostStatus(
    postId: number,
    newPostStatusId: number,
    userFullName: string,
    userEmail: string,
    authenticityToken: string
  ) {
    if (isNaN(newPostStatusId)) newPostStatusId = null;

    dispatch(changePostStatus(postId, newPostStatusId, authenticityToken)).then(res => {
      if (res && res.status !== 204) return;

      dispatch(postStatusChangeSubmitted({
        postStatusId: newPostStatusId,
        userFullName,
        userEmail,
        createdAt: fromJavascriptDateToRailsString(new Date()),
      }));
    });
  },

  submitFollow(postId: number, isFollow: boolean, authenticityToken: string) {
    dispatch(submitFollow(postId, isFollow, authenticityToken));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PostP);