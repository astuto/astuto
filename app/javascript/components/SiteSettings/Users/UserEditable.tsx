import * as React from "react";
import Gravatar from 'react-gravatar';
import I18n from 'i18n-js';

import IUser from "../../../interfaces/IUser";
import Separator from "../../common/Separator";
import { MutedText } from "../../common/CustomTexts";

interface Props {
  user: IUser;
}

interface State {
  editMode: boolean;
}

class UserEditable extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = { editMode: false };
  }

  render() {
    const { user } = this.props;

    const editEnabled = user.status === 'active';
    const blockEnabled = user.status === 'active' || user.status === 'blocked';

    return (
      <li className="userEditable">
        <div className="userInfo">
          <Gravatar email={user.email} size={32} className="gravatar userGravatar" />

          <span className="userFullName">{ user.fullName }</span>
          <Separator />
          <span>{ user.role }</span>

          {
            user.status !== 'active' ?
              <>
              <Separator />
              <span className={`userStatus userStatus${user.status}`}>{ user.status }</span>
              </>
            :
              null
          }
        </div>

        <div className="userEditableActions">
          <a
            onClick={() => editEnabled && null}
            className={editEnabled ? '' : 'actionDisabled'}
          >
            { I18n.t('common.buttons.edit') }
          </a>

          <Separator />

          <a
            onClick={() => confirm(I18n.t('common.confirmation')) && null}
            className={blockEnabled ? '' : 'actionDisabled'}
          >
            {
              user.status !== 'blocked' ?
                I18n.t('site_settings.users.block')
              :
                I18n.t('site_settings.users.unblock')
            }
          </a>
        </div>
      </li>
    );
  }
}

export default UserEditable;