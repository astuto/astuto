import * as React from 'react';

export const BADGE_TYPE_LIGHT = 'badgeLight';
export const BADGE_TYPE_WARNING = 'badgeWarning';
export const BADGE_TYPE_DANGER = 'badgeDanger';

export type BadgeTypes = 
  typeof BADGE_TYPE_LIGHT |
  typeof BADGE_TYPE_WARNING |
  typeof BADGE_TYPE_DANGER;

interface Props {
  type: BadgeTypes;
  children: string;
}

const Badge = ({ type, children }: Props) => (
  <span className={`badge ${type}`}>
    {children}
  </span>
);

export default Badge;