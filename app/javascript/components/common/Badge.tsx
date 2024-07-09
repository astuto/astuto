import * as React from 'react';

interface Props {
  children: string;
}

const Badge = ({ children }: Props) => <span className="statusBadge">{children}</span>

export default Badge;