import * as React from 'react';
import I18n from 'i18n-js';

import Button from '../common/Button';
import { SmallMutedText } from '../common/CustomTexts';
import SidebarBox from '../common/SidebarBox';

interface Props {
  followed: boolean;
  submitFollow(): void;

  isLoggedIn: boolean;
}

const ActionBox = ({followed, submitFollow, isLoggedIn}: Props) => (
  <SidebarBox title={I18n.t('post.action_box.title')} customClass="actionBoxContainer">
    <Button onClick={isLoggedIn ? submitFollow : () => location.href = '/users/sign_in'} outline>
      { followed ? I18n.t('post.action_box.unfollow_button') : I18n.t('post.action_box.follow_button') }
    </Button>
    <SmallMutedText>
      { followed ?
        I18n.t('post.action_box.following_description')
        :
        I18n.t('post.action_box.not_following_description')
      }
    </SmallMutedText>
  </SidebarBox>
);

export default ActionBox;