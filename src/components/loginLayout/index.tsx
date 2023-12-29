import React from 'react';
import Link from 'next/link';
import { LoginLayoutProps } from './type';
import { pagesUrls } from '@/utils/constants';

import styles from './index.module.scss';

const LoginLayout: React.FC<LoginLayoutProps> = ({ children, title }) => {
  return (
    <div className={styles.container}>
      <div className={styles.mainContainer}>
        <div className={styles.linkContainer}>
          <Link href={pagesUrls.HOME}>Home</Link> / <span>{title}</span>
        </div>
        <div className={styles.content}>
          <div className={styles.card}>
            <h1 className={styles.title}>{title}</h1>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginLayout;
