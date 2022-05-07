import { connect } from 'react-redux';

import { requestComments } from '../actions/Comment/requestComments';
import {
  toggleCommentReply,
  setCommentReplyBody,
} from '../actions/Comment/handleCommentReplies';
import { toggleCommentIsUpdate } from '../actions/Comment/updateComment';
import { submitComment } from '../actions/Comment/submitComment';

import { State } from '../reducers/rootReducer';

import CommentsP from '../components/Comments/CommentsP';

const mapStateToProps = (state: State) => ({
  comments: state.currentPost.comments.items,
  replyForms: state.currentPost.comments.replyForms,
  areLoading: state.currentPost.comments.areLoading,
  error: state.currentPost.comments.error,
});

const mapDispatchToProps = (dispatch) => ({
  requestComments(postId: number) {
    dispatch(requestComments(postId));
  },

  toggleCommentReply(commentId: number) {
    dispatch(toggleCommentReply(commentId));
  },

  setCommentReplyBody(commentId: number, body: string) {
    dispatch(setCommentReplyBody(commentId, body));
  },

  toggleCommentIsPostUpdate(
    postId: number,
    commentId: number,
    currentIsPostUpdate: boolean,
    authenticityToken: string,
  ) {
    dispatch(toggleCommentIsUpdate(postId, commentId, currentIsPostUpdate, authenticityToken));
  },

  submitComment(
    postId: number,
    body: string,
    parentId: number,
    authenticityToken: string,
  ) {
    dispatch(submitComment(postId, body, parentId, authenticityToken));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CommentsP);