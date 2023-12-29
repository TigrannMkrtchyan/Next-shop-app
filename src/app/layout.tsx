import React from 'react';
import Navbar from '@/components/navbar';
import { cookies } from 'next/headers';
import { Inter } from 'next/font/google';
import { ClientCookiesProvider } from '@/contexts/cookieContext';
import { AuthProvider } from '../../services/auth/AuthContext';
import { UserServiceProvider } from '../../services/user/UserServiceContext';
import { UserProvider } from '@/contexts/userContext';
import { ProductServiceProvider } from '../../services/products/ProductServiceContext';
import { NotificationProvider } from '@/contexts/notificationContext';
import { PaymentProvider } from '../../services/payment/paymentContext';
import { OrderProvider } from '../../services/order/orderContext';

import './globals.scss';
const inter = Inter({ subsets: ['latin'] });

const RootLayout: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const token = cookies().get('token')?.value;

  return (
    <html lang='en'>
      <body className={inter.className}>
        <ClientCookiesProvider token={token}>
          <NotificationProvider>
            <AuthProvider>
              <UserServiceProvider>
                <ProductServiceProvider>
                  <UserProvider>
                    <PaymentProvider>
                      <OrderProvider>
                        <Navbar>{children}</Navbar>
                      </OrderProvider>
                    </PaymentProvider>
                  </UserProvider>
                </ProductServiceProvider>
              </UserServiceProvider>
            </AuthProvider>
          </NotificationProvider>
        </ClientCookiesProvider>
      </body>
    </html>
  );
};

export default RootLayout;
