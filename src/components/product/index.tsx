import React from 'react';
import Link from 'next/link';
import { ProductProps } from './type';

import styles from './index.module.scss';

const Product: React.FC<ProductProps> = ({ price, name, img, href }) => {
  return (
    <div className={styles.mainContainer}>
      <Link className={styles.imageWarper} href={href}>
        <img src={img} alt='' />
      </Link>
      <Link className={styles.content} href={href}>
        {name}
      </Link>
      <p className={styles.content}>${price}</p>
    </div>
  );
};

export default Product;
