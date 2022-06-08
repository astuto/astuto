import * as React from 'react';

interface Props {
  children: React.ReactNode;
}

const Sidebar = ({ children }: Props) => (
  <div className="sidebar">
    {children}
  </div>
);

export default Sidebar;