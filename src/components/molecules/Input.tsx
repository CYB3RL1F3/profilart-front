import React, { FC, useCallback } from "react";
import { InputText } from "primereact/inputtext";
import { GridCol } from "components/atoms/Grid";
const uuid = require('react-uuid');
export interface InputProps {
  id?: string;
  label: string;
  value?: string;
  type?: string;
  name?: string;
  disabled?: boolean;
  keyfilter?: string | RegExp;
  required?: boolean;
  defaultValue?: string;
  reference?: any;
  onChange?: (value: string) => void;
}

export const Input: FC<InputProps> = ({ id = uuid(), name, reference, label, value, defaultValue, required, onChange, keyfilter=/.*/gmi, disabled=false, type = "text" }) => {
  const updateValue = useCallback((e) => {
    onChange && onChange(e.target.value);
  }, [onChange]);
  return (
    <GridCol>
      <span className="md-inputfield">
        <InputText 
          type={type} 
          disabled={disabled} 
          id={id} 
          keyfilter={keyfilter}
          value={value} 
          ref={reference}
          defaultValue={defaultValue}
          name={name}
          required={required}
          onChange={updateValue}
        />
        <label htmlFor={id} children={label} />
      </span>
    </GridCol>
  )
}

export default Input