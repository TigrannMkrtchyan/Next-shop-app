'use client';
import React, { createContext, useContext } from 'react';
import { IClientCookiesProviderProps } from './types';

const cookieContext = createContext<{ token?: string } | undefined>(undefined);

export const ClientCookiesProvider = ({
  children,
  token,
}: IClientCookiesProviderProps) => (
  <cookieContext.Provider value={{ token }}>{children}</cookieContext.Provider>
);

export const useCookieContext = () => {
  const context = useContext(cookieContext);
  if (!context) {
    throw new Error('useCookieContext must be used within an cookieContext');
  }

  return context;
};
