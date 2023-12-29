import React from 'react';
import Link from 'next/link';
import { ShopCardProps } from './type';

import styles from './index.module.scss';

const ShopCard: React.FC<ShopCardProps> = ({
  title,
  description,
  buttonText,
  href,
  image,
}) => {
  return (
    <div className={styles.mainContainer}>
      <img className={styles.image} src={image} alt='' />
      <h2>{title}</h2>
      <p>{description}</p>
      <div className={styles.linkWarper}>
        <Link href={href} className={styles.link}>
          {buttonText}
        </Link>
      </div>
    </div>
  );
};

export default ShopCard;
