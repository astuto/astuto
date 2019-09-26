import * as React from 'react';

interface Props {
  children: any;
  onClick(e: React.FormEvent): void;
  className?: string;
  outline?: boolean;
}

const Button = ({ children, onClick, className = '', outline = false}: Props) => (
  <button
    onClick={onClick}
    className={`${className} btn btn-${outline ? 'outline-' : ''}dark`}
  >
    {children}
  </button>
);

export default Button;