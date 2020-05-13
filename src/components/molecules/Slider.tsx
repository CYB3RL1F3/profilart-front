import React, { FC, useCallback, useState } from "react";
import { Slider as SliderComponent} from 'primereact-working/slider';
import { GridCol } from 'components/atoms/Grid';
import classNames from 'classnames';

export interface CheckboxProps {
  label: string;
  defaultValue?: number;
  id: string;
  disabled?: boolean;
  min?: number;
  max?: number;
  step?: number;
  orientation?: string;
  onChange: (value: number) => void;
}

export const Slider: FC<CheckboxProps> = ({ label, step = 1, disabled = false, min = 0, max = 100000, id, onChange, defaultValue }) => {
  const [value, changeValue] = useState<number>(defaultValue || 0);
  const slide = useCallback((e) => {
    if (!disabled) {
      changeValue(e.value);
      onChange(e.value);
    }
  }, [onChange, changeValue, disabled])
  const className = classNames({
    slider: true,
    disabled
  })
  return (
    <div className={className}>
    <GridCol>
        <label htmlFor={id} className="p-slider-label">{label.replace("##", value.toString())}</label>
        <SliderComponent disabled={disabled} min={min} max={max} id={id} value={value} step={step} onChange={slide} />
    </GridCol>
    </div>
  )
};

export default Slider;