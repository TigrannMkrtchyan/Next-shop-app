'use client';
import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../../services/auth/AuthContext';
import { useUser } from '@/contexts/userContext';
import { pagesUrls } from '@/utils/constants';

import styles from './index.module.scss';

const Account: React.FC = () => {
  const authService = useAuth();
  const router = useRouter();
  const { user, setUser } = useUser();
  const onLogoutHandler = async () => {
    const res = await authService.signout();
    if (res.success) {
      router.push(pagesUrls.LOGIN);
      setUser(undefined);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.mainContainer}>
        <div className={styles.linkContainer}>
          <Link href={pagesUrls.HOME}>Home</Link> / <span>Account details</span>
        </div>
        <div className={styles.title}>
          <h1>My Account</h1>
        </div>
        <div className={styles.contentContainer}>
          <div className={styles.history}>
            <h1>Order History</h1>
            <p>You have not placed any orders yet</p>
          </div>
          <div className={styles.details}>
            <div className={styles.detailsTitle}>
              <h1>Account Details</h1>
              <p onClick={onLogoutHandler}>Logout</p>
            </div>
            <div className={styles.detailsData}>
              <img src='/icon/user.svg' alt='' /> <p>{user?.username}</p>
            </div>
            <div className={styles.detailsData}>
              <img src='/icon/message.svg' alt='' /> <p>{user?.email}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Account;
