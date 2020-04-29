import React, { FC } from "react";

export interface CardProps {
  title?: string;
  className?: string;
}

export const Card: FC<CardProps> = ({ children, className, title }) => (
  <div className={`card card-w-title ${className}`}>
    {title && <h1>{title}</h1>}
    {children}
  </div>
)

export default Card;