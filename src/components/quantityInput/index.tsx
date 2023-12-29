import React from 'react';
import { Input } from 'antd';
import { QuantityInputProps } from './type';

import styles from './index.module.scss';

const QuantityInput: React.FC<QuantityInputProps> = ({
  value,
  placeholder,
  onChange,
}) => {
  return (
    <Input
      placeholder={placeholder}
      type='number'
      className={styles.input}
      min={0}
      value={value}
      onChange={(e) => {
        onChange(Number(e.target.value));
      }}
    />
  );
};

export default QuantityInput;
