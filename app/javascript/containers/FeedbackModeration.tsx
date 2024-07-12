import { connect } from "react-redux";

import FeedbackModerationP from "../components/Moderation/Feedback/FeedbackModerationP";

import { State } from "../reducers/rootReducer";
import { requestPostsForModeration } from "../actions/Post/requestPosts";
import { updatePostApprovalStatus } from "../actions/Post/updatePost";
import { PostApprovalStatus } from "../interfaces/IPost";

const mapStateToProps = (state: State) => ({
  posts: state.moderation.feedback.posts,
  areLoading: state.moderation.feedback.areLoading,
  areUpdating: state.moderation.feedback.areUpdating,
  error: state.moderation.feedback.error,
});

const mapDispatchToProps = (dispatch: any) => ({
  requestPostsForModeration() {
    dispatch(requestPostsForModeration());
  },

  updatePostApprovalStatus(
    id: number,
    approvalStatus: PostApprovalStatus,
    authenticityToken: string
  ) {
    return dispatch(updatePostApprovalStatus(id, approvalStatus, authenticityToken));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FeedbackModerationP);