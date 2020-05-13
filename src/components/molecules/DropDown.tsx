import React, { FC } from "react";
import { GridCol12 } from "components/atoms/Grid";
import { Dropdown as DropdownComponent, DropdownProps } from "primereact-working/dropdown";

export const Dropdown: FC<DropdownProps> = ({ value, options, onChange, filterPlaceholder, placeholder, filterBy }) => (
  <GridCol12 className="dropdown">
    <DropdownComponent filterMatchMode={'contains'} value={value} options={options} onChange={onChange} filter={true} filterPlaceholder={filterPlaceholder} filterBy={filterBy} placeholder={placeholder}/>
  </GridCol12>
);

export default Dropdown;