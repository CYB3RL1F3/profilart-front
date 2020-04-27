import React, { FC } from "react";
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'style/style.scss';
export const AppLayout: FC = ({ children }) => {
  return (
    <div className="layout-wrapper">
      <div className="layout-main">
          {children}
      </div>
    </div>
  )
}

export default AppLayout;