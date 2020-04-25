import React, { FC } from "react";

export const Grid: FC = ({ children }) => (
  <div className="p-grid" children={children} />
);

export const GridCol6: FC = ({ children }) => (
  <div className="p-col p-col-6" children={children} />
)

export const GridCol12: FC = ({ children }) => (
  <div className="p-col p-col-12" children={children} />
)

export default Grid;