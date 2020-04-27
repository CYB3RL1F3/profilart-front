import React, { FC } from "react";

interface GridProps {
  className?: string;
}

export const Grid: FC<GridProps> = ({ children, className = "" }) => (
  <div className={`p-grid ${className}`} children={children} />
);

export const GridCol6: FC<GridProps> = ({ children, className = "" }) => (
  <div className={`p-col p-col-12 p-lg-6 ${className}`} children={children} />
)

export const GridCol12: FC<GridProps> = ({ children, className = "" }) => (
  <div className={`p-col p-col-12 p-lg-12 ${className}`} children={children} />
)

export const GridCol: FC<GridProps> = ({ children, className = "" }) => (
  <div className={`p-col p-col-12 ${className}`} children={children} />
)

export const GridDashboard: FC<GridProps> = ({ children, className = "" }) => (
  <div className={`p-grid dashboard ${className}`} children={children} />
)

export default Grid;