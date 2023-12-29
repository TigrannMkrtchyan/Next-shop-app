import React from 'react';
import { AccountCardProps } from './type';

import styles from './index.module.scss';

const AccountCard: React.FC<AccountCardProps> = ({
  products,
  handleDelete,
}) => {
  return (
    <div className={styles.productsList}>
      <div className={styles.headers}>
        <p className={styles.productHeader}>PRODUCT</p>
        <p>PRICE</p>
        <p>QUANTITY</p>
        <p className={styles.productTotal}>TOTAL</p>
      </div>
      {products.map((value,i) => (
        <div className={styles.productDataCard} key={i}>
          <div className={styles.info}>
            <img src={value.product.images[0]} alt='' />
            <div className={styles.infoDetails}>
              <p>Mix and match chuck taylor all star</p>
              <p>Size: {value.size}</p>
              <p>Color: {value.product.color}</p>
              <p
                className={styles.remove}
                onClick={() => {
                  handleDelete(value.product._id, value.size);
                }}
              >
                Remove
              </p>
            </div>
          </div>
          <p className={styles.priceAndQuantity}>${value.product.price}</p>
          <p className={styles.priceAndQuantity}>{value.count}</p>
          <p
            className={`${styles.priceAndQuantity} ${styles.priceAndQuantityLast}`}
          >
            ${value.count * value.product.price}
          </p>
          <div className={styles.smallScreenInfo}>
            <p>${value.count * value.product.price}</p>
            <p>Qty {value.count}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AccountCard;
