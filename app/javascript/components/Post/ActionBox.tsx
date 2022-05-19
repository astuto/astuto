import * as React from 'react';
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
      <BoxTitleText>Actions</BoxTitleText>
      <br />
      <Button onClick={isLoggedIn ? submitFollow : () => location.href = '/users/sign_in'} outline>
        { followed ? 'Unfollow post' : 'Follow post' }
      </Button>
      <br />
      <SmallMutedText>
        { followed ?
          'you\'re receiving notifications about new updates on this post'
          :
          'you won\'t receive notifications about this post'
        }
      </SmallMutedText>
    </div>
  </div>
);

export default ActionBox;