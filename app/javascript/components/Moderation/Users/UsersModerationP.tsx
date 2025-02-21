import * as React from 'react';
import I18n from 'i18n-js';

import UserEditable from './UserEditable';
import Box from '../../common/Box';
import SiteSettingsInfoBox from '../../common/SiteSettingsInfoBox';

import { UsersState } from '../../../reducers/usersReducer';
import { UserRoles, USER_STATUS_ACTIVE, USER_STATUS_BLOCKED, USER_STATUS_DELETED } from '../../../interfaces/IUser';
import HttpStatus from '../../../constants/http_status';
import Spinner from '../../common/Spinner';

export const LocalUserRoles = {
  Admin: "admin",
  Moderator: "moderator",
  User: "user",
} as const;

export type LocalUserRoles = (typeof LocalUserRoles)[keyof typeof LocalUserRoles];

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

interface State {
  searchQuery: string;
  statusFilter: string;
  roleFilter: string;
}

class UsersModerationP extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      searchQuery: "",
      statusFilter: "all",
      roleFilter: "all",
    };

    this._handleUpdateUserRole = this._handleUpdateUserRole.bind(this);
    this._handleUpdateUserStatus = this._handleUpdateUserStatus.bind(this);
    this._handleSearchChange = this._handleSearchChange.bind(this);
    this._handleStatusChange = this._handleStatusChange.bind(this);
    this._handleRoleChange = this._handleRoleChange.bind(this);
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

  _handleSearchChange(event: React.ChangeEvent<HTMLInputElement>) {
    this.setState({ searchQuery: event.target.value });
  }

  _handleStatusChange(event: React.ChangeEvent<HTMLSelectElement>) {
    this.setState({ statusFilter: event.target.value });
  }

  _handleRoleChange(event: React.ChangeEvent<HTMLSelectElement>) {
    this.setState({ roleFilter: event.target.value });
  }

  render() {
    const {
      users,
      settingsAreUpdating,
      settingsError,
      currentUserRole,
      currentUserEmail,
    } = this.props;
    const { searchQuery, statusFilter, roleFilter } = this.state;

    const numberOfUsers = users.items.length;
    const numberOfActiveUsers = users.items.filter(u => u.status === USER_STATUS_ACTIVE).length;
    const numberOfBlockedUsers = users.items.filter(u => u.status === USER_STATUS_BLOCKED).length;
    const numberOfDeletedUsers = users.items.filter(u => u.status === USER_STATUS_DELETED).length;

    const filteredUsers = users.items.filter((user) => {
      const matchesSearch =
        !searchQuery.trim() ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.fullName?.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesStatus =
        statusFilter === "all" ||
        (statusFilter === "blocked" && user.status === USER_STATUS_BLOCKED) ||
        (statusFilter === "active" && user.status === USER_STATUS_ACTIVE);

      const matchesRole = roleFilter === "all" || user.role === (roleFilter as UserRoles);

      return matchesSearch && matchesStatus && matchesRole;
    });

    return (
      <>
        <Box>
          <h2>{I18n.t('moderation.users.title')}</h2>
          <div style={{ display: "flex", gap: "1rem", marginBottom: "1rem" }}>
            <input
              type="text"
              className="form-control"
              placeholder={I18n.t('search.placeholder')}
              value={searchQuery}
              onChange={this._handleSearchChange}
            />
            <select className="selectPicker" style={{ width: "auto" }} value={statusFilter} onChange={this._handleStatusChange}>
              <option value="all">{I18n.t('search.all_users')}</option>
              <option value="active">{I18n.t('search.active_users')}</option>
              <option value="blocked">{I18n.t('search.blocked_users')}</option>
            </select>
            <select className="selectPicker" style={{ width: "auto" }} value={roleFilter} onChange={this._handleRoleChange}>
              <option value="all">{I18n.t('search.all_roles')}</option>
              <option value={LocalUserRoles.Admin}>{I18n.t('search.admin')}</option>
              <option value={LocalUserRoles.Moderator}>{I18n.t('search.moderator')}</option>
              <option value={LocalUserRoles.User}>{I18n.t('search.user')}</option>
            </select>
          </div>

          <p className="userCount">
            {filteredUsers.length} {I18n.t('activerecord.models.user', { count: filteredUsers.length })} (
            {numberOfActiveUsers} {I18n.t('moderation.users.status_active')},&nbsp;
            {numberOfBlockedUsers} {I18n.t('moderation.users.status_blocked')},&nbsp;
            {numberOfDeletedUsers} {I18n.t('moderation.users.status_deleted')})
          </p>

          <ul className="usersList">
            {
              users.areLoading === false ?
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
                :
                <Spinner />
            }
          </ul>
        </Box>

        <SiteSettingsInfoBox areUpdating={settingsAreUpdating || users.areLoading} error={settingsError} />
      </>
    );
  }
}

export default UsersModerationP;