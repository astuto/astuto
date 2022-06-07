import * as React from 'react';

interface Props {
  children: string;
}

interface DescriptionTextProps {
  children: string;
  limit?: number;
}

export const TitleText = ({ children }: Props) => (
  <span className="titleText">{children}</span>
);

export const BoxTitleText = ({ children }: Props) => (
  <span className="boxTitleText">{children}</span>
);

export const MutedText = ({ children }: Props) => (
  <span className="mutedText">{children}</span>
);

export const CenteredMutedText = ({ children }: Props) => (
  <p className="centeredText"><span className="mutedText">{children}</span></p>
);

export const SmallMutedText = ({ children }: Props) => (
  <p className="smallMutedText">{children}</p>
);

export const UppercaseText = ({ children }: Props) => (
  <span className="uppercaseText">{children}</span>
);

export const SuccessText = ({ children }: Props) => (
  <span className="successText">{children}</span>
);

export const DangerText = ({ children }: Props) => (
  <span className="dangerText">{children}</span>
);

export const DescriptionText = ({ children, limit = 90}: DescriptionTextProps) => (
  <span className="descriptionText">
    {
      children && children.length > limit ?
        children.slice(0, limit-1) + '...'
      :
        children || '<No description provided>'
    }
  </span>
);