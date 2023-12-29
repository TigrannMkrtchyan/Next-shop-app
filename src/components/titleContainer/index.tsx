import React from 'react';
import styles from './index.module.scss';

const TitleContainer: React.FC = () => {
  return (
    <div className={styles.mainContainer}>
      <div className={styles.textContainer}>
        <h1 className={styles.title}>Discount 20% For All Orders Over $2000</h1>
        <p >
          Use coupon code <span className={styles.code}>DISCOUNT20</span>
        </p>
        <p >Use coupon DISCOUNT20</p>
      </div>
    </div>
  );
};

export default TitleContainer;
