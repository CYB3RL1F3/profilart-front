import React, { FC } from "react";
export interface PageLayoutInterface {
  className?: string;
}

export const PageLayout: FC<PageLayoutInterface> = ({ children, className }) => {
  return (
    <div className={`layout-content ${className}`}>
      {children}
    </div>

  )
}