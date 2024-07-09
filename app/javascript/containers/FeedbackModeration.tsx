import { connect } from "react-redux";

import FeedbackModerationP from "../components/Moderation/Feedback/FeedbackModerationP";

import { State } from "../reducers/rootReducer";

const mapStateToProps = (state: State) => ({

});

const mapDispatchToProps = (dispatch: any) => ({
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FeedbackModerationP);