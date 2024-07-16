import { connect } from "react-redux";

import UsersModerationP from "../components/Moderation/Users/UsersModerationP";

import { requestUsers } from "../actions/User/requestUsers";
import { updateUser } from "../actions/User/updateUser";
import { UserRoles, USER_STATUS_ACTIVE, USER_STATUS_BLOCKED } from "../interfaces/IUser";
import { State } from "../reducers/rootReducer";

const mapStateToProps = (state: State) => ({
  users: state.users,
  settingsAreUpdating: state.moderation.users.areUpdating,
  settingsError: state.moderation.users.error,
});

const mapDispatchToProps = (dispatch: any) => ({
  requestUsers() {
    dispatch(requestUsers());
  },

  updateUserRole(
    id: number,
    role: UserRoles,
    authenticityToken: string,
  ): Promise<any> {
    return dispatch(updateUser({
      id,
      role,
      authenticityToken,
    }));
  },

  updateUserStatus(
    id: number,
    status: typeof USER_STATUS_ACTIVE | typeof USER_STATUS_BLOCKED,
    authenticityToken: string,
  ) {
    dispatch(updateUser({
      id,
      status,
      authenticityToken,
    }));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UsersModerationP);