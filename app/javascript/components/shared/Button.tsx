import * as React from 'react';

interface Props {
  children: any;
  onClick(e: React.FormEvent): void;
  className?: string;
  outline?: boolean;
  disabled?: boolean;
}

const Button = ({ children, onClick, className = '', outline = false, disabled = false}: Props) => (
  <button
    onClick={onClick}
    className={`${className} btn btn-${outline ? 'outline-' : ''}dark`}
    disabled={disabled}
  >
    {children}
  </button>
);

export default Button;