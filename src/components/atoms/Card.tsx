import React, { FC } from "react";

export interface CardProps {
  title?: string;
}

export const Card: FC<CardProps> = ({ children, title }) => (
  <div className="card card-w-title">
    {title && <h1>{title}</h1>}
    {children}
  </div>
)

export default Card;