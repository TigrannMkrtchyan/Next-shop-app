'use client';
import React from 'react';
import useCheckoutForm from '@/hooks/forms/useCheckoutForm';
import Input from '../input';
import Button from '../button';
import PaymentModal from '../paymentModal';

import styles from './index.module.scss';

const CheckoutForm: React.FC = () => {
  const {
    isOpen,
    onClose,
    countryError,
    provinceError,
    postcodeError,
    cityError,
    nameError,
    addressError,
    telephoneError,
    country,
    province,
    postcode,
    telephone,
    name,
    address,
    city,
    paymentSucceeded,
    setCountry,
    setPostcode,
    setProvince,
    setTelephone,
    setName,
    setAddress,
    setCity,
    handleSubmit,
    onSuccess,
  } = useCheckoutForm();

  return (
    <div className={styles.wrapper}>
      {paymentSucceeded ? (
        <div className={styles.successMessage}>
          <h1>Payment successfully done </h1>
        </div>
      ) : (
        <div className={styles.mainContainer}>
          <div className={styles.inputContainer}>
            <h1>Shipping Address</h1>
            <div className={styles.nameContainer}>
              <Input
                className={styles.input}
                placeholder='Full name'
                label='Full name'
                value={name}
                error={nameError}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setName(e.target.value)
                }
              />
              <Input
                className={styles.input}
                placeholder='Telephone'
                label='Telephone'
                value={telephone}
                error={telephoneError}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setTelephone(e.target.value)
                }
              />
            </div>
            <Input
              className={styles.input}
              placeholder='Address'
              label='Address'
              value={address}
              error={addressError}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setAddress(e.target.value)
              }
            />
            <Input
              className={styles.input}
              placeholder='City'
              label='City'
              value={city}
              error={cityError}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setCity(e.target.value)
              }
            />
            <Input
              className={styles.input}
              placeholder='Country'
              label='Country'
              value={country}
              error={countryError}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setCountry(e.target.value)
              }
            />
            <Input
              className={styles.input}
              placeholder='Province'
              label='Province'
              value={province}
              error={provinceError}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setProvince(e.target.value)
              }
            />
            <Input
              className={styles.input}
              placeholder='Postcode'
              label='Postcode'
              value={postcode}
              error={postcodeError}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setPostcode(e.target.value)
              }
            />
          </div>
          <div>
            <Button onClick={handleSubmit}>Continue to payment</Button>
          </div>
          <PaymentModal
            isOpen={isOpen}
            onCancel={onClose}
            onSuccess={onSuccess}
          />
        </div>
      )}
    </div>
  );
};

export default CheckoutForm;
