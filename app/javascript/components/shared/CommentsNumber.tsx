import * as React from 'react';

interface Props {
  number: number;
}

const CommentsNumber = ({ number }: Props) => (
  <div className="d-flex">
    <span className="comment icon"></span>
    <span>{`${number} comment${number === 1 ? '' : 's'}`}</span>
  </div>
);

export default CommentsNumber;