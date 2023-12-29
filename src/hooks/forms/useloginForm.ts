'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../../services/auth/AuthContext';
import { useUser } from '@/contexts/userContext';
import { useNotificationContext } from '@/contexts/notificationContext';
import { pagesUrls } from '@/utils/constants';
import { FailedMessages } from '@/utils/constants';
import { validateEmail, validatePassword } from '@/utils/validate';

const useLoginForm = () => {
  const router = useRouter();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [emailError, setEmailError] = useState<string>('');
  const [passwordError, setPasswordError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [errorExists, setErrorExists] = useState<boolean>(false);
  const authService = useAuth();
  const { openNotification } = useNotificationContext();
  const { getUser } = useUser();

  const handleSubmit = async () => {
    setEmailError('');
    setPasswordError('');
    let error = false;

    if (!email) {
      setEmailError(FailedMessages.userNameOrEmailMissing);
      error = true;
    }

    if (!validateEmail(email)) {
      setEmailError(FailedMessages.InvalidEmail);
      error = true;
    }

    if (!password) {
      setPasswordError(FailedMessages.passwordRequired);
      error = true;
    }

    if (!validatePassword(password)) {
      setPasswordError(FailedMessages.InvalidPassword);
      error = true;
    }

    if (!error) {
      setLoading(true);
      const submit = await authService.login({
        email,
        password,
      });
      setLoading(false);
      if (submit.success) {
        router.push(pagesUrls.ACCOUNT);
        getUser();
      } else {
        openNotification('something went wrong', submit.message);
      }
    }
  };
  useEffect(() => {
    const isValidPassword = password.trim().length;
    const isValidEmail = email.trim().length;

    if (!isValidEmail || !isValidPassword) {
      setErrorExists(true);
    } else {
      setErrorExists(false);
    }
  }, [password, email]);

  return {
    email,
    setEmail,
    password,
    setPassword,
    emailError,
    setEmailError,
    passwordError,
    setPasswordError,
    loading,
    setLoading,
    errorExists,
    setErrorExists,
    handleSubmit,
  };
};

export default useLoginForm;
