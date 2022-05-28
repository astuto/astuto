import * as React from 'react';

interface Props {
  name: string;
  color: string;
}

const PostStatusLabel = ({
  name,
  color,
}: Props) => (
  <span className="badge" style={{backgroundColor: color || 'black', color: 'white'}}>
    {(name || 'no status').toUpperCase()}
  </span>
);

export default PostStatusLabel;