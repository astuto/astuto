import * as React from 'react';

interface Props {
  name: string;
}

const PostBoardLabel = ({ name }: Props) => (
  <span className="badge badgeLight">{name?.toUpperCase()}</span>
);

export default PostBoardLabel;