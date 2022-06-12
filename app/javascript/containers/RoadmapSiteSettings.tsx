import { connect } from "react-redux";

import RoadmapSiteSettingsP from "../components/SiteSettings/Roadmap/RoadmapSiteSettingsP";

import { requestPostStatuses } from "../actions/PostStatus/requestPostStatuses";
import { State } from "../reducers/rootReducer";
import { updatePostStatus } from "../actions/PostStatus/updatePostStatus";

const mapStateToProps = (state: State) => ({
  postStatuses: state.postStatuses,
  settingsAreUpdating: state.siteSettings.roadmap.areUpdating,
  settingsError: state.siteSettings.roadmap.error,
});

const mapDispatchToProps = (dispatch: any) => ({
  requestPostStatuses() {
    dispatch(requestPostStatuses());
  },

  updatePostStatus(id: number, showInRoadmap: boolean, onComplete: Function, authenticityToken: string) {
    dispatch(updatePostStatus({id, showInRoadmap, authenticityToken})).then(() => {
      onComplete();
    });
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RoadmapSiteSettingsP);