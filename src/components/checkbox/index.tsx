import React from 'react';
import { CheckboxProps } from './type';
import styles from './index.module.scss';

const CheckBox: React.FC<CheckboxProps> = ({
  className,
  frameStyles,
  ...props
}) => {
  return (
    <label className={`${styles.container} ${frameStyles}`}>
      <input type="checkbox" className={styles.checkBox} {...props} />
      <span className={`${styles.checkmark} ${className}`} />
    </label>
  );
};

export default CheckBox;
