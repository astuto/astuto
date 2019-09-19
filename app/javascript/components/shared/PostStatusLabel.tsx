import * as React from 'react';

import IPostStatus from '../../interfaces/IPostStatus';

const PostStatusLabel = ({
  id,
  name,
  color,
}: IPostStatus) => (
  <span className="badge" style={{backgroundColor: color, color: 'white'}}>{name}</span>
);

export default PostStatusLabel;