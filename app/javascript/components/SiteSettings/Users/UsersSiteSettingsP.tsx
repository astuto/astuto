import * as React from 'react';
import I18n from 'i18n-js';

import UserEditable from './UserEditable';
import Box from '../../common/Box';
import SiteSettingsInfoBox from '../../common/SiteSettingsInfoBox';

import { UsersState } from '../../../reducers/usersReducer';
import { UserRoles, USER_STATUS_ACTIVE, USER_STATUS_BLOCKED } from '../../../interfaces/IUser';
import HttpStatus from '../../../constants/http_status';

interface Props {
  users: UsersState;
  settingsAreUpdating: boolean;
  settingsError: string;

  requestUsers(): void;
  updateUserRole(
    id: number,
    role: UserRoles,
    authenticityToken: string,
  ): Promise<any>;
  updateUserStatus(
    id: number,
    status: typeof USER_STATUS_ACTIVE | typeof USER_STATUS_BLOCKED,
    authenticityToken: string,
  ): void;

  currentUserEmail: string;
  currentUserRole: UserRoles;
  authenticityToken: string;
}

class UsersSiteSettingsP extends React.Component<Props> {
  constructor(props: Props) {
    super(props);

    this._handleUpdateUserRole = this._handleUpdateUserRole.bind(this);
    this._handleUpdateUserStatus = this._handleUpdateUserStatus.bind(this);
  }

  componentDidMount() {
    this.props.requestUsers();
  }

  _handleUpdateUserRole(id: number, role: UserRoles, closeEditMode: Function) {
    this.props.updateUserRole(
      id,
      role,
      this.props.authenticityToken,
    ).then(res => {
      if (res?.status !== HttpStatus.OK) return;

      closeEditMode();
    });
  }

  _handleUpdateUserStatus(id: number, status: typeof USER_STATUS_ACTIVE | typeof USER_STATUS_BLOCKED) {
    this.props.updateUserStatus(
      id,
      status,
      this.props.authenticityToken,
    );
  }

  render() {
    const {
      users,
      settingsAreUpdating,
      settingsError,
      currentUserRole,
      currentUserEmail,
    } = this.props;

    return (
      <>
        <Box>
          <h2>{ I18n.t('site_settings.users.title') }</h2>

          <ul className="usersList">
            {
              users.items.map((user, i) => (
                <UserEditable
                  user={user}
                  updateUserRole={this._handleUpdateUserRole}
                  updateUserStatus={this._handleUpdateUserStatus}

                  currentUserEmail={currentUserEmail}
                  currentUserRole={currentUserRole}
                  key={i}
                />
              ))
            }
          </ul>
        </Box>

        <SiteSettingsInfoBox areUpdating={settingsAreUpdating || users.areLoading} error={settingsError} />
      </>
    );
  }
}

export default UsersSiteSettingsP;