'use client';
import React, { createContext, useContext, useState, useEffect } from 'react';
import { IUserContext } from './types';
import { UserData } from '../../services/base/types';
import { useUserService } from '../../services/user/UserServiceContext';

const UserContext = createContext<IUserContext | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const userService = useUserService();
  const [user, setUser] = useState<UserData | undefined>();

  const getUser = async () => {
    const response = await userService.getOwnData();

    if (response.success && response?.data) {
      setUser({
        ...response.data,
      });
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  const contextValue = { user, setUser, getUser };
  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within an UserProvider');
  }

  return context;
};
