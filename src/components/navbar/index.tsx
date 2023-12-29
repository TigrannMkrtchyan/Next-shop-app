'use client';
import React, { memo, useState } from 'react';
import Link from 'next/link';
import Line from '../line';
import Footer from '../footer';
import ImageLink from '../imageLink';
import { userLinks } from './data';
import { pagesUrls } from '@/utils/constants';

import styles from './index.module.scss';
const Navbar: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <div className={styles.container}>
      <div >
        <div className={styles.mainContainer}>
          <div className={styles.navbar}>
            <ImageLink
              href={pagesUrls.HOME}
              src='/icon/logo.svg'
              alt=''
              className={styles.logoIcon}
            />
            <div className={styles.linkContainer}>
              {userLinks.map((value, i) => (
                <Link href={value.link} key={i}>
                  {value.name}
                </Link>
              ))}
            </div>
            <div className={styles.iconContainer}>
              <ImageLink src='/icon/beg.svg' href={pagesUrls.CARD} alt='' />
              <ImageLink src='/icon/user.svg' href={pagesUrls.ACCOUNT} alt='' />
              <img
                src='/icon/menu.svg'
                alt=''
                className={styles.menuIcon}
                onClick={() => {
                  setIsOpen(!isOpen);
                }}
              />
            </div>
          </div>
          {isOpen && (
            <div className={styles.mobileNavbar}>
              {userLinks.map((value, i) => (
                <div className={styles.mobileLinkContainer} key={i}>
                  <Link href={value.link}>{value.name}</Link>
                  <Line />
                </div>
              ))}
            </div>
          )}
        </div>
        <div>{children}</div>
      </div>
      <Footer />
    </div>
  );
};

export default memo(Navbar);
