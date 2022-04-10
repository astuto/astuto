import { connect } from "react-redux";

import { requestPostStatuses } from "../actions/requestPostStatuses";
import { updatePostStatusOrder } from "../actions/updatePostStatusOrder";
import PostStatusesSiteSettingsP from "../components/SiteSettings/PostStatuses/PostStatusesSiteSettingsP";
import IPostStatus from "../interfaces/IPostStatus";
import { State } from "../reducers/rootReducer";

const mapStateToProps = (state: State) => ({
  postStatuses: state.postStatuses,
});

const mapDispatchToProps = (dispatch: any) => ({
  requestPostStatuses() {
    dispatch(requestPostStatuses());
  },

  updatePostStatusOrder(
    id: number,
    postStatuses: Array<IPostStatus>,
    sourceIndex: number,
    destinationIndex: number,
    authenticityToken: string) {
      dispatch(updatePostStatusOrder(id, postStatuses, sourceIndex, destinationIndex, authenticityToken));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostStatusesSiteSettingsP);