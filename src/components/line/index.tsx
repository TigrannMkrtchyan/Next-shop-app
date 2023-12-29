import React, { HTMLAttributes } from 'react';
import styles from './index.module.scss';

const Line: React.FC<HTMLAttributes<HTMLDivElement>> = ({
  className,
  ...rest
}) => {
  return <div {...rest} className={`${styles.line} ${className}`} />;
};

export default Line;
