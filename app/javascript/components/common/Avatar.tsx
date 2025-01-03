import * as React from 'react';
import Gravatar from 'react-gravatar';

interface Props {
  avatar?: string;
  email: string;
  size?: number;
}

const Avatar = ({avatar, email, size = 28}: Props) => {
  if (avatar) {
    return <img src={avatar} alt={`${email} avatar`} width={size} height={size} className="avatar" />;
  } else {
    return <Gravatar email={email} size={size} className="avatar" />;
  }
}

export default Avatar;