import React from 'react';
import styles from './index.module.scss';

const Button: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement>> = ({
  ...rest
}) => {
  return <button className={styles.button} {...rest} />;
};

export default Button;
