import React from 'react';
import Link from 'next/link';
import CheckoutForm from '@/components/checkoutForm';
import { pagesUrls } from '@/utils/constants';

import styles from './index.module.scss';

const CheckOutPage: React.FC = () => {
  return (
    <div className={styles.container}>
      <div className={styles.mainContainer}>
        <div className={styles.linkContainer}>
          <Link href={pagesUrls.HOME}>Home</Link> / <span>Checkout</span>
        </div>
        <CheckoutForm/>
      </div>
    </div>
  );
};

export default CheckOutPage;
