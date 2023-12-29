import React from 'react';
import { SizeButtonProps } from './type';

import styles from './index.module.scss';

const SizeButton: React.FC<SizeButtonProps> = ({ text, chosen, onClick }) => {
  return (
    <div
      className={`${styles.button} ${chosen ? styles.chosen : ''}`}
      onClick={onClick}
    >
      {text}
    </div>
  );
};

export default SizeButton;
