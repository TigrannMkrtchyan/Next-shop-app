'use client';
import React from 'react';
import Link from 'next/link';
import useRegistrationForm from '@/hooks/forms/useRegistrationForm';
import Input from '../input';
import Button from '../button';
import { pagesUrls } from '@/utils/constants';

import styles from './index.module.scss';

const RegisterForm: React.FC = () => {
  const {
    name,
    handleUsernameChange,
    email,
    setEmail,
    password,
    setPassword,
    emailError,
    passwordError,
    nameError,
    loading,
    handleSubmit,
  } = useRegistrationForm();

  return (
    <div className={styles.mainContainer}>
      <Input placeholder='Full Name' value={name} error={nameError}  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          handleUsernameChange(e)
        }/>
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
      <Button onClick={handleSubmit} disabled={loading}>SIGN UP</Button>
      <div className={styles.links}>
        <p>Already have an account?</p>
        <Link className={styles.link} href={pagesUrls.LOGIN}>
          Login
        </Link>
      </div>
    </div>
  );
};

export default RegisterForm;
