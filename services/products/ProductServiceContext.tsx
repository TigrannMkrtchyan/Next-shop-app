'use client';
import React, { createContext, useContext } from 'react';
import ProductService from './product.service';
import { useCookieContext } from '@/contexts/cookieContext';
import { IProductService } from '../base/types';

const ProductServiceContext = createContext<IProductService | undefined>(undefined);

interface ProductServiceProviderProps {
  children: React.ReactNode;
}

export const ProductServiceProvider: React.FC<ProductServiceProviderProps> = ({ children }) => {
  const { token } = useCookieContext();
  const productService = new ProductService(token);

  return (
    <ProductServiceContext.Provider value={productService}>{children}</ProductServiceContext.Provider>
  );
};

export const useProductService = () => {
  const context = useContext(ProductServiceContext);
  if (!context) {
    throw new Error('useProductService must be used within an ProductServiceProvider');
  }
  return context;
};
