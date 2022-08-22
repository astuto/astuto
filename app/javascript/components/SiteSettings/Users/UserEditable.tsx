import * as React from "react";
import Gravatar from 'react-gravatar';
import I18n from 'i18n-js';

import IUser, { UserRoles, USER_ROLE_ADMIN, USER_ROLE_USER, USER_STATUS_ACTIVE, USER_STATUS_BLOCKED, USER_STATUS_DELETED } from "../../../interfaces/IUser";
import Separator from "../../common/Separator";
import UserForm from "./UserForm";
import { MutedText } from "../../common/CustomTexts";
import { BlockIcon, CancelIcon, EditIcon, UnblockIcon } from "../../common/Icons";
import ActionLink from "../../common/ActionLink";

interface Props {
  user: IUser;
  updateUserRole(
    id: number,
    role: UserRoles,
    closeEditMode: Function,
  ): void;
  updateUserStatus(
    id: number,
    status: typeof USER_STATUS_ACTIVE | typeof USER_STATUS_BLOCKED,
  ): void;

  currentUserRole: UserRoles;
  currentUserEmail: string;
}

interface State {
  editMode: boolean;
}

class UserEditable extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = { editMode: false };

    this.toggleEditMode = this.toggleEditMode.bind(this);
    this._handleUpdateUserRole = this._handleUpdateUserRole.bind(this);
    this._handleUpdateUserStatus = this._handleUpdateUserStatus.bind(this);
  }

  toggleEditMode() {
    this.setState({ editMode: !this.state.editMode });
  }

  _handleUpdateUserRole(newRole: UserRoles) {
    this.props.updateUserRole(
      this.props.user.id,
      newRole,
      this.toggleEditMode,
    );
  }

  _handleUpdateUserStatus() {
    const { user } = this.props;
    const currentStatus = user.status;
    let newStatus: typeof USER_STATUS_ACTIVE | typeof USER_STATUS_BLOCKED;

    if (currentStatus === 'deleted') return;

    if (currentStatus === 'active') newStatus = 'blocked';
    else newStatus = 'active';
    
    const confirmationMessage =
      newStatus === 'blocked' ?
        I18n.t('site_settings.users.block_confirmation', { name: user.fullName })
      :
        I18n.t('site_settings.users.unblock_confirmation', { name: user.fullName });

    const confirmationResponse =  confirm(confirmationMessage);

    if (confirmationResponse) {
      this.props.updateUserStatus(user.id, newStatus);
    }
  }

  render() {
    const { user, currentUserRole, currentUserEmail } = this.props;
    const { editMode } = this.state;

    const editEnabled =
      user.status === USER_STATUS_ACTIVE &&
      currentUserRole === USER_ROLE_ADMIN &&
      currentUserEmail !== user.email;

    const blockEnabled =
      user.status !== USER_STATUS_DELETED &&
      (currentUserRole === USER_ROLE_ADMIN || user.role === USER_ROLE_USER) &&
      currentUserEmail !== user.email;

    return (
      <li className="userEditable">
        {
          editMode === false ?
          <>
            <div className="userInfo">
              <Gravatar email={user.email} size={42} className="gravatar userGravatar" />

              <div className="userFullNameRoleStatus">
                <span className="userFullName">{ user.fullName }</span>
                
                <div className="userRoleStatus">
                  <span>
                    <MutedText>{ I18n.t(`site_settings.users.role_${user.role}`) }</MutedText>
                  </span>

                  {
                    user.status !== USER_STATUS_ACTIVE ?
                      <>
                      <Separator />
                      <span className={`userStatus userStatus${user.status}`}>
                      { I18n.t(`site_settings.users.status_${user.status}`) }
                      </span>
                      </>
                    :
                      null
                  }
                </div>
              </div>
            </div>

            <div className="userEditableActions">
              <ActionLink
                onClick={() => editEnabled && this.toggleEditMode()}
                icon={<EditIcon />}
                disabled={!editEnabled}
              >
                { I18n.t('common.buttons.edit') }
              </ActionLink>

              <ActionLink
                onClick={() => blockEnabled && this._handleUpdateUserStatus()}
                icon={user.status !== USER_STATUS_BLOCKED ? <BlockIcon /> : <UnblockIcon />}
                disabled={!blockEnabled}
              >
                {
                  user.status !== USER_STATUS_BLOCKED ?
                    I18n.t('site_settings.users.block')
                  :
                    I18n.t('site_settings.users.unblock')
                }
              </ActionLink>
            </div>
          </>
          :
            <>
            <UserForm user={user} updateUserRole={this._handleUpdateUserRole} />
            <ActionLink onClick={this.toggleEditMode} icon={<CancelIcon />}>
              {I18n.t('common.buttons.cancel')}
            </ActionLink>
            </>
        }
      </li>
    );
  }
}

export default UserEditable;