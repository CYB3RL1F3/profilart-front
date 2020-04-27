import React, { FC, useCallback, useState } from "react";
import {Checkbox as CheckboxComponent} from 'primereact/checkbox';
import { GridCol } from 'components/atoms/Grid';

export interface CheckboxProps {
  label: string;
  defaultChecked?: boolean;
  id: string;
  name: string;
  onChange: (value: boolean) => void;
}

export const Checkbox: FC<CheckboxProps> = ({ name, label, id, onChange, defaultChecked }) => {
  const [checked, check] = useState<boolean>(defaultChecked || false);
  const toggle = useCallback((e) => {
    check(e.target.checked);
    onChange(e.target.checked);
  }, [onChange, check])
  return (
    <div className="checkbox">
      <GridCol>
          <CheckboxComponent name={name} inputId={id} checked={checked} onChange={toggle} />
          <label htmlFor={id} className="p-checkbox-label">{label}</label>
      </GridCol>
    </div>
  )
};

export default Checkbox;