import React, { HTMLProps, ReactNode } from 'react';
import styles from './Card.module.css';

interface CardProps extends HTMLProps<HTMLDivElement>{
  children: ReactNode;
  className?: string;
};

const Card = ({ children, className }: CardProps) => {
  return (
    <div className={`${styles.card} ${className}`}>
      {children}
    </div>
  );
};

export default Card;
