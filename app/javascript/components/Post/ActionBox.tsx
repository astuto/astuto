import * as React from 'react';
import I18n from 'i18n-js';

import Button from '../shared/Button';
import { BoxTitleText, SmallMutedText } from '../shared/CustomTexts';

interface Props {
  followed: boolean;
  submitFollow(): void;

  isLoggedIn: boolean;
}

const ActionBox = ({followed, submitFollow, isLoggedIn}: Props) => (
  <div className="actionBoxContainer">
    <div className="actionBoxFollow">
      <BoxTitleText>{I18n.t('post.action_box.title')}</BoxTitleText>
      <br />
      <Button onClick={isLoggedIn ? submitFollow : () => location.href = '/users/sign_in'} outline>
        { followed ? I18n.t('post.action_box.unfollow_button') : I18n.t('post.action_box.follow_button') }
      </Button>
      <br />
      <SmallMutedText>
        { followed ?
          I18n.t('post.action_box.following_description')
          :
          I18n.t('post.action_box.not_following_description')
        }
      </SmallMutedText>
    </div>
  </div>
);

export default ActionBox;