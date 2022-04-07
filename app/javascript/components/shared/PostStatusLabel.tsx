import * as React from 'react';

interface Props {
  name: string;
  color: string;
}

const PostStatusLabel = ({
  name,
  color,
}: Props) => (
  <span className="badge" style={{backgroundColor: color, color: 'white'}}>
    {name?.toUpperCase()}
  </span>
);

export default PostStatusLabel;