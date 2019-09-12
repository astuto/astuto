import * as React from 'react';

import IPostStatus from '../../interfaces/IPostStatus';

const PostStatusLabel = ({
  id,
  name,
  color,
}: IPostStatus) => (
  <div style={{display: 'flex'}}>
    <div className="dot" style={{backgroundColor: color}}></div>
    <span className="postStatusName">{name}</span>
  </div>
);

export default PostStatusLabel;