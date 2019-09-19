import * as React from 'react';

interface Props {
  number: number;
}

const CommentsNumber = ({ number }: Props) => (
  <span className="badge badgeLight">{`${number} comment${number === 1 ? '' : 's'}`}</span>
);

export default CommentsNumber;