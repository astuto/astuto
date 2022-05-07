import { connect } from "react-redux";

import BoardsSiteSettingsP from "../components/SiteSettings/Boards/BoardsSiteSettingsP";
import { requestBoards } from "../actions/Board/requestBoards";
import { updateBoardOrder } from "../actions/Board/updateBoardOrder";
import IBoard from "../interfaces/IBoard";
import { State } from "../reducers/rootReducer";

const mapStateToProps = (state: State) => ({
  boards: state.boards,
  settingsAreUpdating: state.siteSettings.boards.areUpdating,
  settingsError: state.siteSettings.boards.error,
});

const mapDispatchToProps = (dispatch: any) => ({
  requestBoards() {
    dispatch(requestBoards());
  },

  updateBoardOrder(
    id: number,
    boards: Array<IBoard>,
    sourceIndex: number,
    destinationIndex: number,
    authenticityToken: string) {
      dispatch(updateBoardOrder(id, boards, sourceIndex, destinationIndex, authenticityToken));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BoardsSiteSettingsP);