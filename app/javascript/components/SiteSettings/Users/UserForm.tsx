import * as React from 'react';
import Gravatar from 'react-gravatar';
import I18n from 'i18n-js';

import Button from '../../common/Button';
import IUser, { UserRoles, USER_ROLE_ADMIN, USER_ROLE_MODERATOR, USER_ROLE_USER } from '../../../interfaces/IUser';
import Separator from '../../common/Separator';

interface Props {
  user: IUser;
  updateUserRole(newRole: UserRoles): void;
}

interface State {
  role: UserRoles;
}

class UserForm extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = { role: this.props.user.role };

    this._handleUpdateUserRole = this._handleUpdateUserRole.bind(this);
  }

  _handleUpdateUserRole(selectedRole: UserRoles) {
    const { user, updateUserRole } = this.props;
    let confirmation = true;

    if (selectedRole === 'admin') {
      confirmation = confirm(I18n.t('site_settings.users.role_to_admin_confirmation', { name: user.fullName }));
    }

    if (confirmation) updateUserRole(selectedRole);
  }

  render() {
    const { user } = this.props;
    const selectedRole = this.state.role;

    return (
      <div className="userForm">
        <Gravatar email={user.email} size={32} className="gravatar userGravatar" />

        <input type="text" disabled value={user.fullName}></input>
        <Separator />

        <select
          value={selectedRole || 'Loading...'}
          onChange={
            (e: React.FormEvent) => {
              this.setState({role: (e.target as HTMLSelectElement).value as UserRoles});
          }}
          id="selectPickerUserRole"
          className="selectPicker"
        >
          <optgroup label="Roles">
            <option value={USER_ROLE_USER}>
              { I18n.t(`site_settings.users.role_${USER_ROLE_USER}`) }
            </option>
            <option value={USER_ROLE_MODERATOR}>
              { I18n.t(`site_settings.users.role_${USER_ROLE_MODERATOR}`) }
            </option>
            <option value={USER_ROLE_ADMIN}>
              { I18n.t(`site_settings.users.role_${USER_ROLE_ADMIN}`) }
            </option>
          </optgroup>
        </select>

        <Button onClick={() => this._handleUpdateUserRole(selectedRole)} className="updateUserButton">
          { I18n.t('common.buttons.update') }
        </Button>
      </div>
    );
  }
}

export default UserForm;