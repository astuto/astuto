import * as React from 'react';

import { BoxTitleText } from './CustomTexts';

interface Props {
  title: string;
  customClass?: string;
  children: React.ReactNode;
}

const SidebarBox = ({ title, customClass, children }: Props) => (
  <div className={`sidebarBox ${customClass}`}>
    <BoxTitleText>{title}</BoxTitleText>
    {children}
  </div>
);

export default SidebarBox;