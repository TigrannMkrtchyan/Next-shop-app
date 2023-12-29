import React from 'react';
import styles from './index.module.scss';

const Footer = () => {
  return (
    <div className={styles.mainContainer}>
      <div className={styles.footer}>
        <div className={styles.iconContainer}>
          <img src='/icon/visa.svg' alt='' />
          <img src='/icon/master.svg' alt='' />
          <img src='/icon/paypal.svg' alt='' />
        </div>
      </div>
    </div>
  );
};

export default Footer;
