import * as React from 'react';

interface Props {
  onClick: React.MouseEventHandler<HTMLAnchorElement>;
  icon?: React.ReactElement;
  disabled?: boolean;
  customClass?: string;
  children: React.ReactNode;
}

const ActionLink = ({
  onClick,
  icon,
  disabled = false,
  customClass,
  children,
}: Props) => (
  <a
    onClick={onClick}
    className={`actionLink${disabled ? ' actionLinkDisabled' : ''}${customClass ? ' ' + customClass : ''}`}
  >
      {icon}{children}
  </a>
);

export default ActionLink;