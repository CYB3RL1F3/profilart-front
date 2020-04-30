import React, { FC, useCallback, ReactElement, useState } from "react";
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
  disableAutofill?: boolean;
  autoComplete?: string;
  reference?: any;
  error?: string | ReactElement<any, string> | any;
  onChange?: (value: string) => void;
}

export const Input: FC<InputProps> = ({ id = uuid(), autoComplete, disableAutofill = false, error, name, reference, label, value, defaultValue, required, onChange, keyfilter=/.*/gmi, disabled=false, type = "text" }) => {
  const updateValue = useCallback((e) => {
    onChange && onChange(e.target.value);
  }, [onChange]);
  const [readonly, setReadonly] = useState<boolean>(disableAutofill ? true : false);
  const unlock = useCallback(() => setReadonly(false), [setReadonly]);
  return (
    <GridCol>
      <span className="md-inputfield">
        <InputText 
          className={error ? 'p-error' : ''}
          type={type} 
          readOnly={readonly}
          onFocus={unlock}
          disabled={disabled} 
          id={id} 
          keyfilter={keyfilter}
          value={value} 
          ref={reference}
          defaultValue={defaultValue}
          name={name}
          required={required}
          error={error}
          autoComplete={autoComplete}
          onChange={updateValue}
        />
        <label htmlFor={id}>
          {label}
        </label>
        {error && (
          <span className="input-error">ERROR: {error}</span>
        )}
      </span>
    </GridCol>
  )
}

export default Input