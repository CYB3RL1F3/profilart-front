import React, { FC, useCallback } from "react";
import { InputText } from "primereact/inputtext";
const uuid = require('react-uuid');
export interface InputProps {
  id?: string;
  label: string;
  value: string;
  type?: string;
  disabled?: boolean;
  keyfilter?: string | RegExp;
  required?: boolean;
  onChange: (value: string) => void;
}

export const Input: FC<InputProps> = ({ id = uuid(), label, value, required, onChange, keyfilter=/.*/gmi, disabled=false, type = "text" }) => {
  const updateValue = useCallback((e) => onChange(e.target.value), [onChange]);
  return (
    <span className="md-inputfield">
      <InputText 
        type={type} 
        disabled={disabled} 
        id={id} 
        keyfilter={keyfilter}
        value={value} 
        required={required}
        onChange={updateValue}
      />
      <label htmlFor={id} children={label} />
    </span>
  )
}

export default Input