import * as React from 'react';
import I18n from 'i18n-js';

import UserEditable from './UserEditable';
import Box from '../../common/Box';
import SiteSettingsInfoBox from '../../common/SiteSettingsInfoBox';

import { UsersState } from '../../../reducers/usersReducer';

interface Props {
  users: UsersState;
  settingsAreUpdating: boolean;
  settingsError: string;

  requestUsers(): void;

  authenticityToken: string;
}

class UsersSiteSettingsP extends React.Component<Props> {
  componentDidMount() {
    this.props.requestUsers();
  }

  render() {
    const {
      users,
      settingsAreUpdating,
      settingsError,
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