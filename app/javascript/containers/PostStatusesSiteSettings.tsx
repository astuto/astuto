import { connect } from "react-redux";

import { requestPostStatuses } from "../actions/requestPostStatuses";
import PostStatusesSiteSettingsP from "../components/SiteSettings/PostStatuses/PostStatusesSiteSettingsP";
import { State } from "../reducers/rootReducer";

const mapStateToProps = (state: State) => ({
  postStatuses: state.postStatuses,
});

const mapDispatchToProps = (dispatch: any) => ({
  requestPostStatuses() {
    dispatch(requestPostStatuses());
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostStatusesSiteSettingsP);