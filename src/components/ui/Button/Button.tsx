import React from 'react';
import styles from './Button.module.css';

interface ButtonProps
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  title: string;
  isTransparent?: boolean;
}

const Button = ({ title, isTransparent = false, className, ...props }: ButtonProps) => {
  return (
    <button {...props} className={`${styles.button} ${className} ${isTransparent ? styles.transparent : ''}`}>
      {title}
    </button>
  );
};

export default Button;
