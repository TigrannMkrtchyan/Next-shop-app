import React from 'react';
import { InputProps } from './type';
import styles from './index.module.scss';

const Input: React.FC<InputProps> = ({ error, className, label, ...rest }) => {
  return (
    <div className={styles.inputWrapper}>
      {label && <p>{label}</p>}
      <input className={`${styles.input} ${className}`} {...rest} />
      {error && <p className={styles.error}>{error}</p>}
    </div>
  );
};

export default Input;
