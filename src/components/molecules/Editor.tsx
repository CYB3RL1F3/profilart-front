import React, { FC, useCallback, ReactElement } from "react";
import { Editor as InputEditor } from 'primereact-working/editor';
import { GridCol } from "components/atoms/Grid";
const uuid = require('react-uuid');
export interface EditorProps {
  id?: string;
  label: string;
  value?: string;
  name?: string;
  error?: string | ReactElement<any, string> | any;
  onChange?: (value: string) => void;
  width: string;
  height: string;
  reference?: any;
}

export const Editor: FC<EditorProps> = ({ id = uuid(), width, height, onChange, error, value, reference, label }) => {
  const updateValue = useCallback((e) => {
    onChange && onChange(e.htmlValue);
  }, [onChange]);
  return (
    <GridCol>
      <label htmlFor={id}>
        {label}
      </label>
      <InputEditor 
        className={error ? 'p-error' : ''}
        id={id} 
        value={value} 
        ref={reference}
        onTextChange={updateValue}
        style={{
          width,
          height
        }}
      />
      {error && (
        <span className="input-error">ERROR: {error}</span>
      )}
    </GridCol>
  )
}

export default Editor;