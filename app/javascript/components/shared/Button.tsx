import * as React from 'react';
import { FormEvent } from 'react';

interface Props {
  children: string;
  onClick(e: FormEvent): void;
  className?: string;
  outline?: boolean;
}

const Button = ({ children, onClick, className = '', outline = false}: Props) => (
  <button
    onClick={onClick}
    className={`${className} btn btn-${outline ? 'outline-' : ''}dark my-2`}
  >
    {children}
  </button>
);

export default Button;