'use client';
import React, { createContext, useContext } from 'react';
import PaymentService from './payment.service';
import { useCookieContext } from '@/contexts/cookieContext';
import { IPaymentService } from '../base/types';

const PaymentContext = createContext<IPaymentService | undefined>(undefined);

interface PaymentProviderProps {
  children: React.ReactNode;
}

export const PaymentProvider: React.FC<PaymentProviderProps> = ({ children }) => {
  const { token } = useCookieContext();
  const paymentService = new PaymentService(token);

  return (
    <PaymentContext.Provider value={paymentService}>{children}</PaymentContext.Provider>
  );
};

export const usePayment = () => {
  const context = useContext(PaymentContext);
  if (!context) {
    throw new Error('usePayment must be used within an PaymentProvider');
  }
  return context;
};
