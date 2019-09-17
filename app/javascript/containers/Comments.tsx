import { connect } from 'react-redux';

import { requestComments } from '../actions/requestComments';
import {
  toggleCommentReply,
  setCommentReplyBody,
} from '../actions/handleCommentReplies';

import { State } from '../reducers/rootReducer';

import CommentsP from '../components/Comments/CommentsP';

const mapStateToProps = (state: State) => ({
  comments: state.currentPost.comments.items,
  replies: state.currentPost.comments.replies,
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
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CommentsP);