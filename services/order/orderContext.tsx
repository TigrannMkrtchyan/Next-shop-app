'use client';
import React, { createContext, useContext } from 'react';
import OrderService from './order.service';
import { useCookieContext } from '@/contexts/cookieContext';
import {IOrderService } from '../base/types';

const OrderContext = createContext<IOrderService | undefined>(undefined);

interface OrderProviderProps {
  children: React.ReactNode;
}

export const OrderProvider: React.FC<OrderProviderProps> = ({ children }) => {
  const { token } = useCookieContext();
  const orderService = new OrderService(token);

  return (
    <OrderContext.Provider value={orderService}>{children}</OrderContext.Provider>
  );
};

export const useOrder = () => {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error('useOrder must be used within an OrderProvider');
  }
  return context;
};
