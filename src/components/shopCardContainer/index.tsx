import React from 'react';
import ShopCard from '../shopCard';
import { shopList } from './data';

import styles from './index.module.scss';

const ShopCardContainer: React.FC = () => {
  return (
    <div className={styles.shopCards}>
      <div className={styles.shopCardContainer}>
        {shopList.map((value) => (
          <ShopCard
            key={value.buttonText}
            image={value.image}
            title={value.title}
            description={value.description}
            buttonText={value.buttonText}
            href={value.href}
          />
        ))}
      </div>
    </div>
  );
};

export default ShopCardContainer;
