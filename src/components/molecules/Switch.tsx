import React, { useCallback, useState, FC } from "react";
import { InputSwitch } from 'primereact-working/inputswitch';

import { GridCol } from 'components/atoms/Grid';

export interface SwitchProps {
  label: string;
  defaultChecked?: boolean;
  id: string;
  onChange: (value: boolean) => void;
}

export const Switch: FC<SwitchProps> = ({ label, id, onChange, defaultChecked }) => {
  const [checked, check] = useState<boolean>(defaultChecked || false);
  const toggle = useCallback((e) => {
    check(e.value);
    onChange(e.value);
  }, [onChange, check])
  return (
    <div className="checkbox">
      <GridCol>
          <InputSwitch id={id} checked={checked} onChange={toggle} />
          <label htmlFor={id} className="p-checkbox-label">{label}</label>
      </GridCol>
    </div>
  )
};

export default Switch;