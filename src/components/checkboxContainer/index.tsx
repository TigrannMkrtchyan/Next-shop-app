import React, { useMemo } from 'react';
import CheckBox from '../checkbox';
import { CheckboxContainerProps } from './type';

import styles from './index.module.scss';

const CheckBoxContainer: React.FC<CheckboxContainerProps> = ({
  values,
  title,
  setChange,
}) => {
  const handleChange = (value: string) => {
    const copy = { ...values };
    copy[value] = !copy[value];
    setChange(copy);
  };

  const names = useMemo(() => Object.keys(values), [values]);
  return (
    <div className={styles.mainContainer}>
      <h3>{title}</h3>
      {names.map((value, i) => (
        <div className={styles.label} key={i}>
          <CheckBox
            checked={values[value]}
            onChange={() => {
              handleChange(value);
            }}
          />
          <p>{value}</p>
        </div>
      ))}
    </div>
  );
};

export default CheckBoxContainer;
