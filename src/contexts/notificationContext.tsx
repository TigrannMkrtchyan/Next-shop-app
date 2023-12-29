'use client';
import React, { createContext, useContext } from 'react';
import { INotificationContext } from './types';
import { notification } from 'antd';

const NotificationContext = createContext<INotificationContext | undefined>(
  undefined
);

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [api, contextHolder] = notification.useNotification();
  const openNotification = (title: string, description: string) => {
    api.open({
      message: title,
      description,
      duration: 0,
    });
  };
  const contextValue = { openNotification };

  return (
    <NotificationContext.Provider value={contextValue}>
      {contextHolder}
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotificationContext = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useUser must be used within an UserProvider');
  }

  return context;
};
