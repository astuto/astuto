import { connect } from "react-redux";

import BoardsSiteSettingsP from "../components/SiteSettings/Boards/BoardsSiteSettingsP";
import { requestBoards } from "../actions/Board/requestBoards";
import { updateBoardOrder } from "../actions/Board/updateBoardOrder";
import IBoard from "../interfaces/IBoard";
import { State } from "../reducers/rootReducer";
import { submitBoard } from "../actions/Board/submitBoard";
import HttpStatus from "../constants/http_status";
import { deleteBoard } from "../actions/Board/deleteBoard";
import { updateBoard } from "../actions/Board/updateBoard";

const mapStateToProps = (state: State) => ({
  boards: state.boards,
  settingsAreUpdating: state.siteSettings.boards.areUpdating,
  settingsError: state.siteSettings.boards.error,
});

const mapDispatchToProps = (dispatch: any) => ({
  requestBoards() {
    dispatch(requestBoards());
  },

  submitBoard(
    name: string,
    description: string,
    onSuccess: Function,
    authenticityToken: string,
  ) {
    dispatch(submitBoard(name, description, authenticityToken)).then(res => {
      if (res && res.status === HttpStatus.Created) {
        onSuccess();
        window.location.reload();
      }
    });
  },

  updateBoard(
    id: number,
    name: string,
    description: string,
    slug: string,
    onSuccess: Function,
    authenticityToken: string,
  ) {
    dispatch(updateBoard(id, name, description, slug, authenticityToken)).then(res => {
      if (res && res.status === HttpStatus.OK) {
        onSuccess();
        window.location.reload();
      }
    });
  },

  updateBoardOrder(
    id: number,
    boards: Array<IBoard>,
    sourceIndex: number,
    destinationIndex: number,
    authenticityToken: string) {
      dispatch(updateBoardOrder(id, boards, sourceIndex, destinationIndex, authenticityToken));
  },

  deleteBoard(id: number, authenticityToken: string) {
    dispatch(deleteBoard(id, authenticityToken)).then(res => {
      console.log(res);
      if (res && res.status === HttpStatus.Accepted) {
        window.location.reload();
      }
    });
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BoardsSiteSettingsP);