'use client';
import React from 'react';
import Link from 'next/link';
import useLoginForm from '@/hooks/forms/useloginForm';
import Input from '../input';
import Button from '../button';
import { pagesUrls } from '@/utils/constants';

import styles from './index.module.scss';

const LoginForm: React.FC = () => {

  const {
    email,
    setEmail,
    password,
    setPassword,
    emailError,
    passwordError,
    handleSubmit,
    loading,
  } = useLoginForm();

  return (
    <div className={styles.mainContainer}>
      <Input
        placeholder='Email'
        type='email'
        value={email}
        error={emailError}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setEmail(e.target.value)
        }
      />
      <Input
        placeholder='Password'
        type='password'
        value={password}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setPassword(e.target.value)
        }
        error={passwordError}
      />
      <Button onClick={handleSubmit} disabled={loading}>SIGN IN</Button>
      <div className={styles.links}>
        <Link className={styles.link} href={pagesUrls.REGISTER}>
          Create an account
        </Link>
        <p>Forgot your password?</p>
      </div>
    </div>
  );
};

export default LoginForm;
