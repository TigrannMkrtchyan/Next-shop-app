'use client';
import React, { createContext, useContext } from 'react';
import UserService from './user.service';
import { useCookieContext } from '@/contexts/cookieContext';
import { IUserService } from '../base/types';

const UserContext = createContext<IUserService | undefined>(undefined);

interface UserServiceProviderProps {
  children: React.ReactNode;
}

export const UserServiceProvider: React.FC<UserServiceProviderProps> = ({ children }) => {
  const { token } = useCookieContext();
  const userService = new UserService(token);

  return (
    <UserContext.Provider value={userService}>{children}</UserContext.Provider>
  );
};

export const useUserService = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within an UserProvider');
  }
  return context;
};
