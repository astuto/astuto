import * as React from 'react';

interface Props {
  customClass?: string;
  children: React.ReactNode;
}

const Box = ({ customClass, children }: Props) => (
  <div className={`box${customClass ? ' ' + customClass : ''}`}>
    {children}
  </div>
);

export default Box;