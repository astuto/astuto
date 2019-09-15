import * as React from 'react';

interface Props {
  children: string;
}

interface DescriptionTextProps {
  children: string;
  limit?: number;
}

export const TitleText = ({ children }: Props) => (
  <span className="text-dark font-weight-bolder">{children}</span>
);

export const MutedText = ({ children }: Props) => (
  <span className="text-muted text-center">{children}</span>
);

export const UppercaseText = ({ children }: Props) => (
  <span className="text-secondary text-uppercase font-weight-lighter">{children}</span>
);

export const SuccessText = ({ children }: Props) => (
  <span className="text-success text-center">{children}</span>
);

export const DangerText = ({ children }: Props) => (
  <span className="text-danger text-center">{children}</span>
);

export const DescriptionText = ({ children, limit = 90}: DescriptionTextProps) => (
  <span className="text-muted">
    {
      children && children.length > limit ?
        children.slice(0, limit-1) + '...'
      :
        children || '<No description provided>'
    }
  </span>
);