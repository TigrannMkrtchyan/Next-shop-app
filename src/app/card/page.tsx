'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Button from '@/components/button';
import AccountCard from '@/components/accountCard';
import { useUserService } from '../../../services/user/UserServiceContext';
import { pagesUrls } from '@/utils/constants';
import { IPurchasedProducts } from '../../../services/base/types';
import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';

import styles from './index.module.scss';

const Card: React.FC = () => {
  const userService = useUserService();
  const [products, setProducts] = useState<IPurchasedProducts[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);

  const getCardsData = async () => {
    setLoading(true);
    const response = await userService.getCardData();

    if (response.success && response?.data) {
      setProducts(response.data.purchasedProducts);
      let amount = 0;
      for (const element of response.data.purchasedProducts) {
        amount += element.product.price * element.count;
      }
      setTotal(amount);
    }
    setLoading(false);
  };

  const handleDelete = async (id: string, size: string) => {
    const response = await userService.removeFromCard(id, size);
    if (response.success) {
      getCardsData();
    }
  };

  useEffect(() => {
    getCardsData();
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.mainContainer}>
        <div className={styles.linkContainer}>
          <Link href={pagesUrls.HOME}>Home</Link> / <span> Shopping cart</span>
        </div>
        {!products.length ? (
          <div className={styles.noData}>
            {loading ? (
              <div className={styles.loaderContainer}>
                <Spin
                  indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />}
                />
              </div>
            ) : (
              <div className={styles.content}>
                <h1>Shopping cart</h1>
                <p>Your cart is empty!</p>
                <Link href={pagesUrls.HOME}>
                  <Button>CONTINUE SHOPPING</Button>
                </Link>
              </div>
            )}
          </div>
        ) : (
          <div className={styles.products}>
            <div className={styles.productsList}>
              <AccountCard products={products} handleDelete={handleDelete} />
            </div>
            <div className={styles.summary}>
              <h1>Order summary</h1>
              <div className={styles.total}>
                <p>Total</p>
                <p>${total}</p>
              </div>
              <Link href={pagesUrls.CHECKOUT}>
                <Button>CHECKOUT</Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Card;
