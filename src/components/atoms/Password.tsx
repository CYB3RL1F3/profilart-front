import React, { FC, useCallback } from "react";
import { Password } from "primereact/password";
const uuid = require('react-uuid');
export interface InputProps {
  id?: string;
  label: string;
  value: string;
  type?: string;
  disabled?: boolean;
  onChange: (value: string) => void;
}

export const PasswordInput: FC<InputProps> = ({ id = uuid(), label, value, onChange, disabled=false, type = "text" }) => {
  const updateValue = useCallback((e) => onChange(e.target.value), [onChange]);
  return (
    <span className="p-float-label">
      <Password disabled={disabled} id={id} value={value} onChange={updateValue} />
      <label htmlFor={id} children={label} />
    </span>
  )
}

export default PasswordInput;