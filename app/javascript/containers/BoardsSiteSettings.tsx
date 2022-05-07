import { connect } from "react-redux";
import { requestBoards } from "../actions/Board/requestBoards";

import BoardsSiteSettingsP from "../components/SiteSettings/Boards/BoardsSiteSettingsP";

import { State } from "../reducers/rootReducer";

const mapStateToProps = (state: State) => ({
  boards: state.boards,
});

const mapDispatchToProps = (dispatch: any) => ({
  requestBoards() {
    dispatch(requestBoards());
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BoardsSiteSettingsP);