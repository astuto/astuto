import * as React from 'react';

interface Props {
  label?: string;
  onClick: React.MouseEventHandler;
  checked?: boolean;
  htmlId?: string;
}

const Switch = ({ label, onClick, checked, htmlId }: Props) => (
  <div className="checkboxSwitch">
    <input type="checkbox" id={htmlId} onClick={onClick} checked={checked} />
    <label htmlFor={htmlId}>{label}</label>
  </div>
);

export default Switch;