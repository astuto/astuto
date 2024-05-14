import * as React from 'react';

interface Props {
  children: any;
  onClick(e: React.FormEvent): void;
  type?: 'button' | 'submit';
  className?: string;
  outline?: boolean;
  disabled?: boolean;
}

const Button = ({ children, onClick, type="submit", className = '', outline = false, disabled = false}: Props) => (
  <button
    onClick={onClick}
    type={type}
    className={`${className} btn${outline ? 'Outline' : ''}Primary`}
    disabled={disabled}
  >
    {children}
  </button>
);

export default Button;